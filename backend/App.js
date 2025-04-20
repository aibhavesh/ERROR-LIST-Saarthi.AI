import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/conn.js';
import AllRoutes from './routes/allroutes.js';
import adminRoutes from './routes/AdminRoutes.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
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
