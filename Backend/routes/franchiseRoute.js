import express from 'express';
import { registerFranchise } from '../controllers/franchiseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route: POST /api/franchise/register
router.post('/register', verifyToken, registerFranchise);

export default router
