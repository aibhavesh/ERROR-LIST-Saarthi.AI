import Signup from '../models/signupschema.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    // Hash password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user exists
    const existing = await Signup.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const user = await Signup.create({ name, email, password: hashedPassword });

    const secret = process.env.JWT_SECRET;
    if (!secret) return res.status(500).json({ error: 'Server misconfigured: JWT_SECRET missing' });
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '7d' });

    res.status(201).json({ message: 'Signup successful', token, user });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
};
