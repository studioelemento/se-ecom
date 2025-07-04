import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/product-routes.js';
import authRoutes from './routes/authRoutes.js';
import franchiseRoutes from './routes/franchiseRoute.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);
app.use('/api/auth',authRoutes);
app.use('/api/franchise', franchiseRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});