const fs = require('fs');
const path = require('path');

const staticImage = (req, res, next) => {
  const filename = req.params.filename;
  
  if (!filename) {
    return res.status(400).json({ error: 'Filename is required' });
  }
  
  // Security: prevent directory traversal
  const safeName = path.basename(filename);
  const imagePath = path.join(__dirname, '..', 'images', safeName);
  
  // Check if file exists
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Image not found' });
    }
    
    // Get file extension
    const ext = path.extname(safeName).toLowerCase();
    const mimeTypes = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
      '.svg': 'image/svg+xml',
      '.webp': 'image/webp'
    };
    
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    
    // Stream the file
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year
    
    const stream = fs.createReadStream(imagePath);
    stream.on('error', (error) => {
      console.error('Error streaming image:', error);
      res.status(500).json({ error: 'Error reading image file' });
    });
    
    stream.pipe(res);
  });
};

module.exports = staticImage;
