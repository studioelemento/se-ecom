import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { findUserByIdentifier } from '../models/authModel.js';
import dotenv from 'dotenv'


dotenv.config();

export const loginUser=async(req,res)=>{
  const{identifier,password}=req.body;

  if (!identifier|| !password) {
    return res.status(400).json({message:'identifier and password are required'});
  }



  try{
    const user=await findUserByIdentifier(identifier);
    if(!user){
      return res.status(404).json({message:'User not found'});
    }

    if (!user.is_active) {
      return res.status(403).json({message:"Your account is inactive. Contact Support"})
    }

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(401).json({message:'Invalid Password'})
    }

    const token=jwt.sign(
      {
        id:user.id,
        name:user.name,
        role:user.role
      },
      process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRES_IN}
    );

    res.status(200).json({
      message:'Login Successful',
      token,
      user:{
        id:user.id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        role:user.role
      }
    });


  }catch(error){
    res.status(500).json({message:'Login error',error:error.message})
  }
}