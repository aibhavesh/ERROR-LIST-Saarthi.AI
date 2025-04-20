import Signup from '../models/signupschema.js';

export const getUserProfile = async (req, res) => {
  try {
    const user = await Signup.findById(req.user.id).select('-password'); // hide password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user', details: err.message });
  }
};
