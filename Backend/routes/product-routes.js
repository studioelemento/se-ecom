import express from 'express';
import { addProduct } from '../controllers/product-controler.js';

const router = express.Router();

router.post('/products', addProduct);

export default router;

