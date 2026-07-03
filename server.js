// ============================================
// SERVER ENTRY POINT
// ============================================

// Load environment variables from .env file
require('dotenv').config();

// Import the Express application
const app = require('./src/app');

// ============================================
// ENVIRONMENT VARIABLES
// ============================================

// Get port from environment or use default
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const APP_VERSION = process.env.APP_VERSION || '1.0.0';

// ============================================
// START SERVER (Only if run directly)
// ============================================

/**
 * This check allows the file to be:
 * 1. Run directly: node server.js
 * 2. Imported in tests without starting server
 */
if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log('');
    console.log('╔════════════════════════════════════════╗');
    console.log('║   CI/CD Pipeline Application Started  ║');
    console.log('╚════════════════════════════════════════╝');
    console.log('');
    console.log(`📦 Application: CICD-Kubernetes-Project`);
    console.log(`🚀 Version: ${APP_VERSION}`);
    console.log(`🌍 Environment: ${NODE_ENV}`);
    console.log(`🔌 Port: ${PORT}`);
    console.log(`⏰ Started at: ${new Date().toISOString()}`);
    console.log(`🔗 URL: http://localhost:${PORT}`);
    console.log('');
    console.log('Endpoints available:');
    console.log(`  ✓ http://localhost:${PORT}/health`);
    console.log(`  ✓ http://localhost:${PORT}/api/data`);
    console.log(`  ✓ http://localhost:${PORT}/api/users`);
    console.log(`  ✓ http://localhost:${PORT}/api/status`);
    console.log(`  ✓ http://localhost:${PORT}/api/version`);
    console.log(`  ✓ http://localhost:${PORT}/ (Web UI)`);
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('');
  });

  // ============================================
  // GRACEFUL SHUTDOWN
  // ============================================

  /**
   * Handle graceful shutdown on SIGTERM or SIGINT signals
   * Important for Kubernetes pod termination
   */
  const gracefulShutdown = (signal) => {
    console.log(`\n📍 Received ${signal} signal`);
    console.log('🛑 Gracefully shutting down...');

    server.close(() => {
      console.log('✅ HTTP server closed');
      process.exit(0);
    });

    // Force shutdown after 10 seconds
    setTimeout(() => {
      console.error('❌ Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 10000);
  };

  // Handle signals
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle uncaught exceptions
  process.on('uncaughtException', (error) => {
    console.error('💥 Uncaught Exception:', error);
    process.exit(1);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    console.error('💥 Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });
}

// ============================================
// EXPORT
// ============================================

/**
 * Export app for testing purposes
 * Allows tests to import app without starting server
 */
module.exports = app;