import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from './config/conn.js';
import AllRoutes from './routes/allroutes.js';
import adminRoutes from './routes/AdminRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174')
  .split(',')
  .map(o => o.trim());

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(express.json());

// Basic rate limiting
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);
app.use('/uploads', express.static('uploads')); // for serving files
app.use('/api/admin', adminRoutes);
// Connect to DB
connectDB();

// All Routes
app.use('/', AllRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('🚀 Saarthi.AI Backend Running...');
});

app.listen(PORT, () => console.log(`✅ Server started at http://localhost:${PORT}`));
