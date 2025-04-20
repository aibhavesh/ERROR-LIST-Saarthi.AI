// models/UploadSchema.js
import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  filename: String,
  path: String,
  originalname: String,
  mimetype: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Signup'
  }
}, { timestamps: true });

const Upload = mongoose.model('Upload', uploadSchema);
export default Upload;
