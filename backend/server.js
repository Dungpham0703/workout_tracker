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

// health check route (để test Vercel hoạt động)
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // ❗️Chỉ lắng nghe khi chạy LOCAL, không listen khi chạy trên Vercel
    if (!process.env.VERCEL) {
      const port = process.env.PORT || 4000;
      app.listen(port, () => {
        console.log('Server running on port', port);
      });
    }
  })
  .catch((error) => {
    console.error(error);
  });

// Export app cho Vercel dùng
module.exports = app;
