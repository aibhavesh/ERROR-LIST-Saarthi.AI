import Upload from '../models/uploadmodel.js   ';

export const handleUpload = async (req, res) => {
  try {
    const file = req.file;

    if (!file) return res.status(400).json({ message: 'No file uploaded' });

    const upload = new Upload({
      filename: file.filename,
      path: file.path,
      originalname: file.originalname,
      mimetype: file.mimetype,
      user: req.user.id // extracted from token via middleware
    });

    await upload.save();

    res.status(201).json({ message: 'File uploaded successfully', file: upload });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed', details: err.message });
  }
};
