import express from 'express';
import { getUserProfile } from '../controllers/usercontroller.js';
import { requireSignIn } from '../middleware/authmiddleware.js';

const router = express.Router();

router.get('/user/me', requireSignIn, getUserProfile);

export default router;
