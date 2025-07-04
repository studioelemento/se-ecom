import { createFranchise } from '../models/franchiseModel.js';

export const registerFranchise = async (req, res) => {
  try {
    const { name, email, phone, password, frachise_id } = req.body;

    if (!name || !email || !phone || !password || !frachise_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const stockist_id = req.user.id;

    const result = await createFranchise({ name, email, phone, password, frachise_id, stockist_id });

    return res.status(201).json({
      message: "Franchise registered successfully",
      franchiseId: result.insertId
    });
    
  } catch (err) {
    return res.status(500).json({
      message: "Franchise creation failed",
      error: err.message
    });
  }
};
