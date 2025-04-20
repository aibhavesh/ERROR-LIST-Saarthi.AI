import Signup from '../models/signupschema.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hash password using SHA1
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    // Check if user exists
    const existing = await Signup.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });

    const user = await Signup.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({ message: 'Signup successful', token, user });
  } catch (err) {
    res.status(500).json({ error: 'Signup failed', details: err.message });
  }
};
