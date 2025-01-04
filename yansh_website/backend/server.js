const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 5000;

// Serve static files (for frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve uploaded videos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure uploads directory exists
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Create uploads folder if not exists
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Handle video upload
app.post('/upload', upload.single('video'), (req, res) => {
  const videoPath = `/uploads/${req.file.filename}`;
  res.json({ videoPath });
});

// Serve list of all uploaded videos (to display after page refresh)
app.get('/get-videos', (req, res) => {
  const uploadsDir = path.join(__dirname, 'uploads');
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Error reading uploads directory');
    }
    const videoPaths = files.map(file => `/uploads/${file}`);
    res.json(videoPaths); // Send paths of all uploaded videos
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
