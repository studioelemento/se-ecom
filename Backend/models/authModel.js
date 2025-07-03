import pool from "../db/db.js";

export const insertUser=async (name,email,phone,password,role)=>{
  const sql='insert into users(name,email,phone,password,role) values(?,?,?,?,?)';
  const[result]= await pool.query(sql,[name,email,phone,password,role]);
  return result
}

export const findUserByIdentifier = async(identifier)=>{
  const sql='select * from users where email= ? OR phone= ?';
  const [rows]=await pool.query(sql,[identifier,identifier]);
  return rows[0]
};

