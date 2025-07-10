import pool from "../db/db.js";
import bcrypt from 'bcrypt';

export const createFranchise = async ({ name, email, phone, password, franchise_id, stockist_id }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertUserQuery = `
      INSERT INTO users (name, email, phone,franchise_id, password, role)
      VALUES (?, ?, ?, ?, ?, 'franchise')
    `;
    const userValues = [name, email, phone, franchise_id, hashedPassword];
    const [userResult] = await pool.query(insertUserQuery, userValues);

    const user_id = userResult.insertId;


    const insertFranchiseQuery = `
      INSERT INTO franchises (name, email, phone, password, franchise_id, stockist_id, user_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const franchiseValues = [name, email, phone, hashedPassword, franchise_id, stockist_id, user_id];
    const [franchiseResult] = await pool.query(insertFranchiseQuery, franchiseValues);

    return franchiseResult;
  } catch (err) {
    throw err;
  }
};


export const getAllFranchisees = async (stockist_id) =>{
  const sql = `select * from franchises where stockist_id = ?`;
  const [rows] = await pool.query(sql, [stockist_id]);
  return rows;
}

export const getFranchiseesById=async(frachiseId,stockistId)=>{
  const sql=`select * from franchises where franchise_id=? and stockist_id=?`;
  const [rows] = await pool.query(sql,[frachiseId,stockistId]);
  return rows[0];
}

export const updateFranchiseBYId = async (franchise_id, name, email, phone) => {
  try {
    const updateFranchiseSQL = `
      UPDATE franchises 
      SET name = ?, email = ?, phone = ?
      WHERE franchise_id = ?
    `;
    const franchiseValues = [name, email, phone, franchise_id];
    await pool.query(updateFranchiseSQL, franchiseValues);

    const getUserIdSQL = `SELECT user_id FROM franchises WHERE franchise_id = ?`;
    const [userRow] = await pool.query(getUserIdSQL, [franchise_id]);
    const user_id = userRow[0]?.user_id;

    if (!user_id) throw new Error("User ID not found for franchise_id: " + franchise_id);

    const updateUserSQL = `
      UPDATE users 
      SET name = ?, email = ?, phone = ?
      WHERE id = ?
    `;
    const userValues = [name, email, phone, user_id];
    await pool.query(updateUserSQL, userValues);

    return { message: "Franchise and User updated successfully" };

  } catch (err) {
    throw err;
  }
};

export const toggleFrachiseStatus = async(franchise_id, is_active) =>{
  const sql = "update users set is_active = ? where franchise_id = ?";
  const [result] = await pool.query(sql, [is_active,franchise_id]);
  return result;
}