import bcrypt from 'bcrypt';
import { createFranchise } from '../models/franchiseModel.js';
import sendMail from '../utils/sendMail.js';

export const registerFranchise = async (req, res) => {
  try {
    const { name, email, phone, password, frachise_id } = req.body;

    if (!name || !email || !phone || !password || !frachise_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const stockist_id = req.user.id;

    const result = await createFranchise({ name, email, phone, password, frachise_id, stockist_id });

    await sendMail(
      email,
      "Franchise Account Created",
      `<h3>Hello ${name},</h3>
      <p>Your Franchise ID is:<strong>${frachise_id}</strong></p>
      <p>Temporary Password:<strong>${password}</strong></p>
      <p>Please login and change your password after logging in for the first timet</p>
      `
    )

    return res.status(201).json({
      message: "Franchise registered and mail send successfully",
      franchiseId: result.insertId
    });



    
  } catch (err) {
    return res.status(500).json({
      message: "Franchise creation failed",
      error: err.message
    });
  }
};
