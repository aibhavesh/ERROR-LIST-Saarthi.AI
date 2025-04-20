import express from 'express';
import multer from 'multer';
import { handleUpload } from '../controllers/uploadcontroller.js';
import { requireSignIn } from '../middleware/authmiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.post('/upload', requireSignIn, upload.single('file'), handleUpload);

export default router;
