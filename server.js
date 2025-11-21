require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./utils/database');
const logger = require('./middleware/logger');
const staticImage = require('./middleware/staticImage');

// Import routes
const lessonsRouter = require('./routes/lessons');
const ordersRouter = require('./routes/orders');
const searchRouter = require('./routes/search');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database connection
connectDB().catch(console.error);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// Routes
app.use('/lessons', lessonsRouter);
app.use('/orders', ordersRouter);
app.use('/search', searchRouter);
app.get('/images/:filename', staticImage);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Course Management API is running',
    endpoints: [
      'GET /lessons',
      'GET /lessons/:id',
      'PUT /lessons/:id',
      'POST /orders',
      'GET /search?q=',
      'GET /images/:filename'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
