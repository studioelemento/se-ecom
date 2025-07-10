import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/product-routes.js';
import authRoutes from './routes/authRoutes.js';
import franchiseRoutes from './routes/franchiseRoute.js';

dotenv.config();

const app = express();

// ✅ Proper CORS configuration for frontend localhost:5173
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(express.json());

// Route bindings
app.use('/api', router);
app.use('/api/auth', authRoutes);
app.use('/api/franchise', franchiseRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
