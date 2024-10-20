const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const thriftRoutes = require('./ThriftStore'); // Make sure this is correct

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes for thrift stores
app.use('/api/thrift-stores', thriftRoutes);

// Default route for serving the main HTML page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// 404 route for handling undefined routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
