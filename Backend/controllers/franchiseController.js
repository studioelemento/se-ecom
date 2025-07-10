import bcrypt from 'bcrypt';
import { createFranchise } from '../models/franchiseModel.js';
import sendMail from '../utils/sendMail.js';
import { getAllFranchisees } from '../models/franchiseModel.js';
import { getFranchiseesById } from '../models/franchiseModel.js';
import { updateFranchiseBYId } from '../models/franchiseModel.js';
import { toggleFrachiseStatus } from '../models/franchiseModel.js';

export const registerFranchise = async (req, res) => {
  try {
    const { name, email, phone, password, franchise_id } = req.body;

    if (!name || !email || !phone || !password || !franchise_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const stockist_id = req.user.id;

    const result = await createFranchise({ name, email, phone, password, franchise_id, stockist_id });

    await sendMail(
      email,
      "Franchise Account Created",
      `<h3>Hello ${name},</h3>
      <p>Your Franchise ID is:<strong>${franchise_id}</strong></p>
      <p>Temporary Password:<strong>${password}</strong></p>
      <p>Please login and change your password after logging in for the first timet</p>
      `
    )

    return res.status(201).json({
      message: "Franchise registered and mail send successfully",
      franchise_id: result.insertId
    });



    
  } catch (err) {
    return res.status(500).json({
      message: "Franchise creation failed",
      error: err.message
    });
  }
};

export const getFranchisees = async(req,res)=>{
  try {
    const stockist_id=req.user.id;
    const franchisees=await getAllFranchisees(stockist_id);

    res.status(200).json({success:true,data:franchisees})
  } catch (error) {
    res.status(500).json({success:false,message:`failed to fetch franchisees`});
    
  }
};

export const getAFranchise = async(req,res)=>{
  try{
    const stockistId=req.user.id;
    const frachiseId=req.params.id;
    console.log(frachiseId)

    const franchisees=await getFranchiseesById(frachiseId,stockistId);

    if(!franchisees){
      return res.status(404).json({ success:false,message:'Franchisee not found'})
    }
    res.status(200).json({ success:true,data:franchisees});
  }catch(error){
    res.status(500).json({success:false,message:'Failed to Fetch franchisee'});
  }
};

export const updateFranchise = async(req,res)=>{
  try {
    const {franchise_id} = req.params;
    console.log(`${franchise_id}`)
    const { name, email, phone } = req.body;

    if (!name || !email || !phone ) {
      return res.status(400).json({message:"all fields are required"});      
    }

    const result = await updateFranchiseBYId(franchise_id,name,email,phone);

    if (result.affectedRows === 0) {
      return res.status(404).json({message:"Franchise not Found"})
    }
    res.status(200).json({message:`franchisee ${franchise_id} update successfully`})
  } catch (error) {
    res.status(500).json({message:"server errror"})
  }
}

export const toggleFrachisee = async(req,res) =>{
  try {
    const {franchise_id} = req.params;
    const {is_active} =req.body;

    if(typeof is_active !=="boolean"){
      return res.status(400).json({message:"Invalid status format"});
    }

    const result = await toggleFrachiseStatus(franchise_id, is_active);

    if (result.affectedRows ===0) {
      return res.status(404).json({message:"Franchisee not found"});
    }

    res.status(200).json({message:`Franchisee status updated to ${is_active}`})
  } catch (error) {
    res.status(500).json({ message: 'Server error'})
  }
}
