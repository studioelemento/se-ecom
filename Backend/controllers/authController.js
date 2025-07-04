import bcrypt from 'bcrypt'
import { insertUser } from '../models/authModel.js';


export const registerUser=async(req,res)=>{
  const{name,email,phone,password,role}=req.body;
  

  if(!name||!email||!password||!role){
    return res.status(400).json({message:'all fields are required'});
  }

  try{
    const hashedPassword = await bcrypt.hash(password,10);

    const result = await insertUser(name,email,phone,hashedPassword,role);

    res.status(201).json({
      message:'User registered successfully',
      userId:result.insertId
    });
  }catch(err){
    res.status(500).json({message:'Database error',error:err.message})
  }


}