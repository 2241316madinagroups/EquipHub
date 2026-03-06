require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize Express app
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    message: 'EquipHub Backend is running'
  });
});

// Basic test endpoint
app.get('/api/v1/test', (req, res) => {
  res.json({
    message: 'Welcome to EquipHub API',
    version: '1.0.0',
    endpoints: {
      health: '/api/v1/health',
      users: '/api/v1/users',
      equipment: '/api/v1/equipment',
      rentals: '/api/v1/rentals'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'This endpoint does not exist'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ EquipHub Backend running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api/v1/test`);
});