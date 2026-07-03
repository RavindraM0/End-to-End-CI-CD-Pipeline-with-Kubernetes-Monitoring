const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ============================================
// MIDDLEWARE CONFIGURATION
// ============================================

// Enable CORS (Cross-Origin Resource Sharing)
// Allows requests from different domains
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Parse incoming URL-encoded requests
app.use(express.urlencoded({ extended: true }));

// Serve static files from public folder
app.use(express.static('public'));

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

/**
 * GET /health
 * Purpose: Check if the application is running and healthy
 * Used by: Load balancers, Kubernetes liveness probes, monitoring systems
 * Returns: JSON object with status, timestamp, and environment
 */
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
    message: 'Application is running successfully'
  });
});

// ============================================
// MAIN API ENDPOINTS
// ============================================

/**
 * GET /api/data
 * Purpose: Return application metadata and data
 * Returns: Message, version, and timestamp
 * Used in: Dashboard and monitoring
 */
app.get('/api/data', (req, res) => {
  res.status(200).json({
    message: 'CI/CD Pipeline Working!',
    version: process.env.APP_VERSION || '1.0.0',
    timestamp: new Date().toISOString(),
    application: 'CICD-Kubernetes-Project',
    status: 'success'
  });
});

/**
 * GET /api/users
 * Purpose: Return a list of sample users
 * Returns: Array of user objects with id, name, and email
 * Used in: Testing API endpoints and dashboard
 */
app.get('/api/users', (req, res) => {
  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Developer'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'DevOps Engineer'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'System Administrator'
    }
  ];

  res.status(200).json({
    users: users,
    count: users.length,
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /api/status
 * Purpose: Return detailed application status
 * Returns: Detailed status information
 * Used in: Monitoring and debugging
 */
app.get('/api/status', (req, res) => {
  const status = {
    application: 'CICD-Kubernetes-Project',
    version: process.env.APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + ' MB',
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB',
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB'
    }
  };

  res.status(200).json(status);
});

/**
 * GET /api/version
 * Purpose: Return just the version information
 * Returns: Version string
 * Used in: CI/CD pipelines for version checking
 */
app.get('/api/version', (req, res) => {
  res.status(200).json({
    version: process.env.APP_VERSION || '1.0.0'
  });
});

// ============================================
// REQUEST LOGGING MIDDLEWARE
// ============================================

/**
 * Simple request logger middleware
 * Logs every incoming request with method, URL, and timestamp
 */
app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.path}`
  );
  next();
});

// ============================================
// ERROR HANDLING MIDDLEWARE
// ============================================

/**
 * Error handling middleware
 * Catches errors thrown by route handlers or other middleware
 * Must be defined AFTER all other app.use() and routes
 */
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  console.error('Stack:', err.stack);

  const statusCode = err.statusCode || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';

  res.status(statusCode).json({
    error: 'Internal Server Error',
    message: isDevelopment ? err.message : 'An error occurred',
    timestamp: new Date().toISOString(),
    ...(isDevelopment && { stack: err.stack })
  });
});

// ============================================
// 404 NOT FOUND HANDLER
// ============================================

/**
 * 404 handler for undefined routes
 * Must be defined AFTER all routes
 */
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} not found`,
    timestamp: new Date().toISOString()
  });
});

// ============================================
// EXPORT
// ============================================

/**
 * Export the app for:
 * 1. Use in server.js
 * 2. Use in testing with Jest
 */
module.exports = app;