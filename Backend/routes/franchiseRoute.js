import express from 'express';
import { registerFranchise } from '../controllers/franchiseController.js';
import { verifyToken } from '../middleware/authMiddleware.js';
import { getFranchisees } from '../controllers/franchiseController.js';
import { getAFranchise } from '../controllers/franchiseController.js';
import { updateFranchise } from '../controllers/franchiseController.js';
import { toggleFrachisee } from '../controllers/franchiseController.js';

const router = express.Router();


router.post('/register', verifyToken, registerFranchise);
router.get('/all', verifyToken, getFranchisees);
router.get('/:id',verifyToken,getAFranchise);
router.put('/updatefranchise/:franchise_id',verifyToken,updateFranchise)
router.put("/toogle-status/:franchise_id",verifyToken,toggleFrachisee)

export default router;
