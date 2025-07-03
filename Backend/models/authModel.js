import pool from "../db/db.js";

export const insertUser=async (name,email,phone,password,role)=>{
  const sql='insert into users(name,email,phone,password,role) values(?,?,?,?,?)';
  const[result]= await pool.query(sql,[name,email,phone,password,role]);
  return result
}

