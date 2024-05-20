const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to store files
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname;
    const extension = path.extname(originalName);
    cb(null, `${timestamp}${extension}`); // Filename: timestamp + original extension
  }
});

const upload = multer({ storage: storage });

// Endpoint to handle file uploads
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const filePath = path.join('uploads', req.file.filename);
  res.json({ filePath: filePath });
});

module.exports = router;
