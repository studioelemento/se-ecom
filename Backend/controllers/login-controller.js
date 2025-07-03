import bcrypt from 'bcrypt';
import { findUserByIdentifier } from '../models/authModel.js';

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

    const isMatch=await bcrypt.compare(password,user.password);

    if(!isMatch){
      return res.status(401).json({message:'Invalid Password'})
    }

    res.status(200).json({
      message:'Login Successful',
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