const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

// GET /api/workouts
const getWorkouts = async (req, res) => {
  try {
    // sort theo createdAt mới nhất
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    return res.status(200).json(workouts);
  } catch (err) {
    console.error('getWorkouts error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

// GET /api/workouts/:id
const get_single_Workout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid workout id' });
    }

    const workout = await Workout.findById(id);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    return res.status(200).json(workout);
  } catch (err) {
    console.error('get_single_Workout error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

// POST /api/workouts
const createWorkout = async (req, res) => {
  try {
    const { title, load, reps } = req.body;

    const emptyFields = [];
    if (!title) emptyFields.push('title');
    if (load === '' || load === undefined || load === null) emptyFields.push('load');
    if (reps === '' || reps === undefined || reps === null) emptyFields.push('reps');

    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill all the fields', emptyFields });
    }

    const workout = await Workout.create({ title, load, reps });
    return res.status(201).json(workout);
  } catch (err) {
    console.error('createWorkout error:', err.message);
    return res.status(400).json({ error: err.message });
  }
};

// DELETE /api/workouts/:id
const delete_Workout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid workout id' });
    }

    const deleted = await Workout.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    return res.status(200).json({ message: 'Deleted', id: deleted._id });
  } catch (err) {
    console.error('delete_Workout error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

// PATCH /api/workouts/:id
const update_Workout = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid workout id' });
    }

    const updated = await Workout.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if (!updated) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    return res.status(200).json(updated);
  } catch (err) {
    console.error('update_Workout error:', err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  get_single_Workout,
  delete_Workout,
  update_Workout,
};
