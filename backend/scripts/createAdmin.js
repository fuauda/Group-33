const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

// Connect to DB
const connectDB = require('../config/db');
connectDB();

// Get command line arguments
const args = process.argv.slice(2);
const name = args[0];
const email = args[1];
const username = args[2];
const password = args[3];

if (!name || !email || !username || !password) {
  console.error('Usage: node scripts/createAdmin.js <name> <email> <username> <password>');
  console.error('Example: node scripts/createAdmin.js "Admin User" admin@example.com admin admin123');
  process.exit(1);
}

const createFirstAdmin = async () => {
  try {
    // Check if any admin exists
    const adminCount = await Admin.countDocuments();
    
    if (adminCount > 0) {
      console.log('Admin user already exists. Use the admin registration endpoint instead.');
      process.exit(1);
    }

    // Create the first admin with superadmin role
    const admin = new Admin({
      name,
      email,
      username,
      password,
      role: 'superadmin'
    });

    await admin.save();
    
    console.log('✅ First admin user created successfully!');
    console.log('Username:', username);
    console.log('Role: superadmin');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error.message);
    process.exit(1);
  }
};

createFirstAdmin();
