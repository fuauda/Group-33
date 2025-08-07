const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const blogRoute = require('./routes/blogRoute');
const userRoute = require('./routes/userRoute');
const adminRoute = require('./routes/adminRoutes');
const adminInviteRoute = require('./routes/adminInviteRoutes');
const { verifyToken } = require('./middleware/auth');
require('dotenv').config();

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// API Routes
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/admin/invites', adminInviteRoute);
app.use('/api/blogs', blogRoute);
app.use('/api/users', userRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    error: 'Endpoint not found' 
  });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});