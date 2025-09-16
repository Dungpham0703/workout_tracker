require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const workoutRoutes = require('./routes/workouts');

const app = express();

// Middleware
app.use(express.json());

const cors = require('cors');
app.use(cors());
app.options('*', cors());


// Logger nhỏ cho request
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path}`);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Root route
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// Connect DB + Start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });
