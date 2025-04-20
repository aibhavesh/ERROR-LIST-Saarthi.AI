import Signup from '../models/signupschema.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');

    const user = await Signup.findOne({ email, password: hashedPassword });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
};
