const express = require('express');
const multer  = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('file'), (req, res) => {
  // Get the filename of the uploaded file
  const filename = req.file.filename;

  // Construct the URL of the uploaded file
  const fileUrl = `http://${process.env.CYCLIC_APP_NAME}.cyclic-app.com/uploads/${filename}`;

  // Send a JSON response with the URL of the uploaded file
  res.json({ imageUrl: fileUrl });
});

app.get('/uploads/:filename', (req, res) => {
  // Get the filename parameter from the URL
  const filename = req.params.filename;

  // Send the file with the corresponding filename in the 'uploads' directory
  res.sendFile(path.join(__dirname, 'uploads', filename));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
