import pool from "../db/db.js";
import bcrypt from 'bcrypt';

export const createFranchise = async ({ name, email, phone, password, frachise_id, stockist_id }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO franchises (name, email, phone, password, frachise_id, stockist_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [name, email, phone, hashedPassword, frachise_id, stockist_id];
    const [result] = await pool.query(sql, values);

    return result;
  } catch (err) {
    throw err;
  }
};
