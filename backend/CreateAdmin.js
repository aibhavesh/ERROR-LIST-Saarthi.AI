import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from './models/Admin.js'; // adjust the path if needed
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hashed = await bcrypt.hash("admin123", 10);
  await Admin.create({ email: "admin@example.com", password: hashed });
  console.log("✅ Admin created successfully!");
  mongoose.disconnect(); // good practice to close connection
}).catch((err) => {
  console.error("❌ Error connecting to DB:", err);
});
