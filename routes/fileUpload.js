const express = require('express');
const router = express.Router();
const multer = require('multer');
const bucket = require('../firebase'); // Ensure this path is correct

const upload = multer({
  storage: multer.memoryStorage(), // Store file in memory temporarily
});

// Helper function to generate a unique file name
const generateFileName = (originalName) => {
  const timestamp = new Date().toISOString().replace(/[-:.]/g, '');
  const extension = originalName.split('.').pop();
  return `${timestamp}.${extension}`;
};

router.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  const newFileName = generateFileName(req.file.originalname);
  const blob = bucket.file(newFileName);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  blobStream.on('error', (err) => {
    res.status(500).send({ message: 'Something went wrong', error: err.message });
  });

  blobStream.on('finish', () => {
    // The public URL can be used to directly access the file via HTTP
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
    res.status(200).send({ fileName: newFileName, fileLocation: publicUrl });
  });

  blobStream.end(req.file.buffer);
});

module.exports = router;
