const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const get_single_Workout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  try {
    const workout = await Workout.findById(id);
    if (!workout) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(workout);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;
  if (!title || !load || !reps) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const delete_Workout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  try {
    const deleted = await Workout.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

const update_Workout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id' });
  }

  try {
    const updated = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(updated);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  createWorkout,
  getWorkouts,
  get_single_Workout,
  delete_Workout,
  update_Workout,
};
