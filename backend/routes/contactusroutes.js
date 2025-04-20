import express from 'express';
import { submitContactForm } from '../controllers/contactuscontroller.js';

const router = express.Router();

router.post('/contact', submitContactForm);

export default router;
