import express from "express"
import dotenv from "dotenv"
import connectDB from './db.js';
import VerifierModel from './models/Verifier.js';
import OrganizationModel from "./models/Organization.js";
import cors from "cors"
import {success, z} from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authMiddleware from "./middleware/authMiddleware.js";
import {ethers} from "ethers"
import path from 'path'
import fs from 'fs'
import multer from "multer";
import { count } from "console";
import { Certificate } from "crypto";

dotenv.config();

const app = express();

const uploadDir = "uploads";
if(!fs.existsSync(uploadDir)){
   fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination : (req , file , cb) => {
    cb(null , uploadDir);
  },
  filename: (req, file, cb) => {
  const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const safeName = file.originalname.replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");
  cb(null, `${uniqueSuffix}-${safeName}`);
  }
});

const fileFilter = (req , file , cb) => {
  const allowedTypes = ["application/pdf" , "image/jpeg" , "image/png"];
  if(allowedTypes.includes(file.mimetype)){
    cb(null , true);
  }else {
    cb(new Error("Only Pdf and image files are allowed!"))
  }
};

const upload = multer({
  storage ,
  limits : {fileSize: 10 * 1024 * 1024},
  fileFilter,
});

app.use("/uploads" , express.static(uploadDir));


app.use(cors({
  origin : "http://localhost:5173"
}))
app.use(express.json());

const SignupSchema = z.object({
  firstName : z.string().min(2 , "First name should contain atleast 2 characters").max(10 , "First name should contain at max 20 characters"),
  lastName : z.string().min(2 , "Last Name should contain atleast 2 characters").max(10 , "Last Name should contain at max 20 characters"),
  email : z.string().email("Invalid email format"),
  password : z.string().min(8 , "Password must be at least 8 characters long")
})

export const OrgKYCSchema = z.object({
  orgName: z.string().min(2, "Organization name must be at least 2 characters").max(50, "Organization name must be at most 50 characters"),
  orgType: z.string().min(2, "Organization type is required"),
  officialEmail: z.string().email("Invalid official email format"),
  website: z.string().url("Invalid website URL").optional().or(z.literal("")),
  address: z.string().min(5, "Registered address must be at least 5 characters"),
  country: z.string().min(2, "Country is required"),
  registrationNo: z.string().min(2, "Registration number is required"),
  certificate: z
  .any()
  .refine(file => file instanceof File, "Certificate file is required")
  .refine(file => file?.size <= 10_000_000, "File size must be less than 5MB") 
  .refine(file => ["application/pdf", "image/png", "image/jpeg"].includes(file?.type), 
          "Only PDF, PNG, or JPEG files are allowed"),
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(50, "Full name must be at most 50 characters"),
  position: z.string().min(2, "Position is required").max(30, "Position must be at most 30 characters"),
  contactNo: z.string().min(5, "Contact number is required"),
  personalEmail: z.string().email("Invalid personal email format"),
});

connectDB();

app.post("/nonce" , async function(req ,res){
  const {walletAddress} = req.body;
  if(!walletAddress){
    return res.status(400).json({msg : "Wallet Address required"})
  }
  try{
    let org = await OrganizationModel.findOne({walletAddress});
    if(!org){
      org = await OrganizationModel.create({
        walletAddress
      })
    }
    res.json({nonce : org.nonce})
  }catch (err) {
    console.error("DB error: " , err.message);
    res.status(500).json({error : "Server error"})
  }
})

app.post("/walletverify" , async function(req,res){
  const {walletAddress , signature} = req.body;
  const org = await OrganizationModel.findOne({walletAddress});
  if(!org){
    return res.status(400).json({msg : "Organization not found"})
  }
  const recovered = ethers.verifyMessage(org.nonce , signature);
  if(recovered.toLowerCase() !== walletAddress.toLowerCase()){
    return res.status(401).json({msg : "Invalid Signature"})
  }
  org.nonce = Math.floor(Math.random() * 1000000).toString();
  await org.save();

  const token = jwt.sign({
    walletAddress : org.walletAddress , id : org._id
  },process.env.JWT_SECRET , {expiresIn : "1h"})

  res.json({token , iskycVerified : org.iskycVerified});
})

app.post("/signup" , async function(req , res){

  const result = SignupSchema.safeParse(req.body);
  
    if(!result.success){
      console.log(result);
      console.log(result.error.issues);
      const errors = result.error.issues.map((e) => ({
        field : e.path,
        message : e.message
      }));
      return res.status(400).json({errors});
    }
    try{
      
      const saltRounds = 10 ;
      const hashedPassword = await bcrypt.hash(result.data.password , saltRounds);
    
      await VerifierModel.create({
        ...result.data , 
        password : hashedPassword,
      });
      res.json({
      message : "You have Signed up"
    });
    } catch (err){
    console.error("DB error: " , err.message);
    res.status(500).json({error : "Server error"})
  }
});

app.post("/signin" , async function(req , res){
  const {email , password } = req.body;

  try{
    const user = await VerifierModel.findOne({
      email
    })
    if(!user){
      return res.status(400).json({
        error : "Invalid email or Password"
      })
    }
    const isMatch = await bcrypt.compare(password , user.password);
    if(!isMatch){
      res.status(400).json({error : "Invalid email or Password"})
    }

    const token = jwt.sign({
      id : user._id , email : user.email
    }, process.env.JWT_SECRET , {expiresIn : "1h"});

    res.json({message : "Login Successful" , token });

  }catch (err){
    console.log("DB Error" , err.message);
    res.status(500).json({error : "Server Error"});
  }
     
})

app.get("/verify" , authMiddleware , async function(req,res){
  try{
    const user = await VerifierModel.findById(req.user.id).select("-password");
    if(!user){
      return res.status(404).json({error : "User not found"});
    }
    res.json({message : "Token valid" , user});
  }catch (err) {
    console.log("DB error" , err.message);
    res.status(500).json({error : "Server error"});
  }
});
app.get("/dashboard" , authMiddleware , async function(req,res){
  try{
    const user = await VerifierModel.findById(req.user.id).select("-password");
    if(!user){
      return res.status(404).json({error : "User not found"});
    }
    res.json({message : "Token valid" , user});
  }catch (err) {
    console.log("DB error" , err.message);
    res.status(500).json({error : "Server error"});
  }
});
app.post("/kyc", authMiddleware, upload.single("certificate"), async (req, res) => {
  try {
    const org = await OrganizationModel.findById(req.user.id);
    if (!org) {
      return res.status(404).json({ error: "Organization not found" });
    }

    const payload = {
      ...req.body,
      certificate: req.file
    };

    const validatedData = OrgKYCSchema.safeParse(payload);

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const updatedOrg = await OrganizationModel.findOneAndUpdate(
      { walletAddress: req.user.walletAddress },
      {
        kycDetails: {
          orgName: validatedData.orgName,
          orgType: validatedData.orgType,
          officialEmail: validatedData.officialEmail,
          website: validatedData.website,
          address: validatedData.address,
          country: validatedData.country,
          registrationNo: validatedData.registrationNo,
          certificateUrl: fileUrl,
          contactPerson: {
            fullName: validatedData.fullName,
            position: validatedData.position,
            contactNo: validatedData.contactNo,
            personalEmail: validatedData.personalEmail
          },
          status: "Pending"
        },
        iskycVerified: false
      },
      { new: true }
    );

    res.json({ success: true, message: "KYC submitted successfully!", data: updatedOrg });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({ errors: err.errors });
    }
    if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ success: false, message: "File size should not exceed 10 MB" });
    }
    console.log("DB error", err.message);
    res.status(500).json({ error: "Server error" });
  }
});


app.get("/issue" , authMiddleware , async function(req,res){
  try{
    const user = await VerifierModel.findById(req.user.id).select("-password");
    if(!user){
      return res.status(404).json({error : "User not found"});
    }
    res.json({message : "Token valid" , user});
  }catch (err) {
    console.log("DB error" , err.message);
    res.status(500).json({error : "Server error"});
  }
});
app.get("/auth/check" , authMiddleware , (req , res) => {
  res.json({valid : true});
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});