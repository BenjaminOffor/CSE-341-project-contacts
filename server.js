// server.js

const express = require('express');
const { connectToDb } = require('./db/connect');
const contactsRoute = require('./routes/contacts'); // Moved below Express import
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
connectToDb();

// Use contacts route
app.use('/contacts', contactsRoute);

// Root route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
});
