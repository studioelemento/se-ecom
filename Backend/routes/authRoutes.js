import express from 'express';
import { registerUser } from '../controllers/authController.js';
import { loginUser } from '../controllers/login-controller.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router=express.Router();

router.post('/register',registerUser);
router.post('/login',loginUser);

router.get('/dashboard',verifyToken,(req,res)=>{
  res.json({
    message:`Welcome,${req.user.name}!`,
    userId:req.user.id,
    role:req.user.role
  })
})

export default router;