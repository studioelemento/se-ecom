import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const sendMail=async(to, subject, html)=>{
  try {
    const transporter = nodemailer.createTransport({
      host:process.env.EMAIL_HOST,
      post:process.env.EMAIL_PORT,
      secure:false,
      auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
      }
    });
    await transporter.sendMail({
      from:`"Stockist Admin" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
  } catch (error) {
    throw error;
  }
}

export default sendMail;