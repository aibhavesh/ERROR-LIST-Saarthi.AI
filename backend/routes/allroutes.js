import express from 'express';
import SignupRoutes from './signuproutes.js';
import SigninRoutes from './siginroutes.js';
import ContactusRoutes from './contactusroutes.js';
import UploadRoutes from './uploadroutes.js';
import TripRoutes from './triproutes.js';

import UserRoutes from './userroutes.js';
// ...
import { adminLogin } from '../controllers/AdminController.js';

const router = express.Router();

router.use('/api', UserRoutes);
router.use('/api', TripRoutes);
router.use('/api', SignupRoutes);
router.use('/api', SigninRoutes);
router.use('/api', ContactusRoutes);
router.use('/api', UploadRoutes);

router.post('/login', adminLogin);
export default router;
