import express from 'express';
import { planTrip } from '../controllers/tripcontroller.js';
import { requireSignIn } from '../middleware/authmiddleware.js';

const router = express.Router();

router.post('/trip', requireSignIn, planTrip);

export default router;
