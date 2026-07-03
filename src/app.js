const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime()
  });
});

// API data endpoint
app.get('/api/data', (req, res) => {
  res.json({
    message: 'CI/CD Pipeline Working!',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Users endpoint
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];
  res.json({
    users: users,
    count: users.length
  });
});

// 404 error handler for unknown routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested route was not found'
  });
});

module.exports = app;