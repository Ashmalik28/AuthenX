import express from "express"
import dotenv from "dotenv"
import connectDB from './db.js';
import VerifierModel from './models/Verifier.js';
import OrganizationModel from "./models/Organization.js";
import cors from "cors"
import {z} from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authMiddleware from "./middleware/authMiddleware.js";
import {ethers} from "ethers"

dotenv.config();

const app = express();

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
app.get("/kyc" , authMiddleware , async function(req,res){
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