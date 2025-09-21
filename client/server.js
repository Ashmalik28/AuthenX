import express from "express"
import dotenv from "dotenv"
import connectDB from './src/db.js';
import VerifierModel from './src/models/Verifier.js';
import {z} from "zod"

dotenv.config();

const app = express();
app.use(express.json());

const SignupSchema = z.object({
  firstName : z.string().min(2 , "First name should contain atleast 2 characters").max(10 , "First name should contain at max 20 characters"),
  lastName : z.string().min(2 , "Last Name should contain atleast 2 characters").max(10 , "Last Name should contain at max 20 characters"),
  email : z.string().email("Invalid email format"),
  password : z.string().min(8 , "Password must be at least 8 characters long")
})

connectDB();

app.post("/signup" , async function(req , res){
  
  try{
    SignupSchema.safeParse(req.body);

    await VerifierModel.create(req.body);

    res.json({
      message : "You have Signed up"
    })
  } catch (err){
    if(err.errors){
      
    }
  }
  
  res.json({
    message : "You have signed up"
  })

});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});