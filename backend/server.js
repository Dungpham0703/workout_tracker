require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// health check route
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// connect to database and start server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log('🚀 Server running on port', port);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
  });
