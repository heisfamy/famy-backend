/**
 * server.js - Main Server File
 * 
 * This is the entry point for the Express.js backend application.
 * It sets up the server, middleware, routes, and database connection.
 * 
 * Environment Variables Required:
 * - MONGODB_URI: MongoDB connection string
 * - DB_NAME: Database name to use
 * - PORT: Server port (optional, defaults to 3000)
 * 
 * Author: Junior Developer
 * Date: 2024
 */

// Load environment variables from .env file
// This must be called first to make env variables available
require('dotenv').config();

// Import required modules
const express = require('express');           // Express web framework
const cors = require('cors');                 // Enable Cross-Origin Resource Sharing
const path = require('path');                 // Node.js path utilities

// Import database connection utility
const { connectDB } = require('./utils/database');

// Import custom middleware
const logger = require('./middleware/logger');           // Request/response logger
const staticImage = require('./middleware/staticImage'); // Image serving middleware

// Import route handlers
const lessonsRouter = require('./routes/lessons');  // Lessons CRUD operations
const ordersRouter = require('./routes/orders');    // Order management
const searchRouter = require('./routes/search');    // Search functionality

// Create Express application instance
const app = express();

// Get port from environment or use default 3000
const PORT = process.env.PORT || 3000;

// Initialize database connection
// This connects to MongoDB using the connection string from .env
connectDB().catch(error => {
  console.error('Failed to connect to database:', error);
  // Don't exit - server can still run for testing without DB
});

// ===== MIDDLEWARE SETUP =====
// Middleware functions execute in order for each request

// Enable CORS for all origins (allows frontend to access API)
app.use(cors());

// Parse JSON request bodies (for POST/PUT requests)
app.use(express.json());

// Parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Custom logger middleware - logs all requests/responses
app.use(logger);

// ===== ROUTE SETUP =====
// Mount route handlers at their respective paths

// Lessons routes - handles all /lessons/* requests
app.use('/lessons', lessonsRouter);

// Orders routes - handles all /orders/* requests  
app.use('/orders', ordersRouter);

// Search route - handles /search?q= requests
app.use('/search', searchRouter);

// Static image serving - handles /images/:filename requests
// This is a single route, not a router
app.get('/images/:filename', staticImage);

// ===== ROOT ENDPOINT =====
// Health check route - returns API status and available endpoints
// This is useful for monitoring and documentation
app.get('/', (req, res) => {
  res.json({ 
    status: 'OK',                                    // API is running
    message: 'Course Management API is running',     // Human-readable message
    endpoints: [                                     // List of available endpoints
      'GET /lessons',          // Get all lessons
      'GET /lessons/:id',       // Get specific lesson
      'PUT /lessons/:id',       // Update lesson
      'POST /orders',           // Create order
      'GET /search?q=',         // Search lessons
      'GET /images/:filename'   // Get lesson image
    ]
  });
});

// ===== ERROR HANDLING =====

/**
 * Global error handling middleware
 * This catches any errors thrown in routes or middleware
 * Must be defined after all other middleware and routes
 */
app.use((err, req, res, next) => {
  // Log the error for debugging
  console.error('Error occurred:', err);
  
  // Send error response to client
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    // Don't send stack trace in production
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

/**
 * 404 Not Found handler
 * This catches all requests that don't match any route
 * Must be the last middleware
 */
app.use((req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({ 
    error: 'Route not found',
    requested: `${req.method} ${req.path}`
  });
});

// ===== START SERVER =====
/**
 * Start the Express server
 * Listens on the specified PORT for incoming requests
 */
app.listen(PORT, () => {
  console.log('=================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔗 API URL: http://localhost:${PORT}`);
  console.log('=================================');
});
