const express = require('express')
const workoutController = require('../controllers/workoutController')
const router = express.Router()

//get all workouts
router.get('/', workoutController.getWorkouts)

//get a single workouts
router.get('/:id', workoutController.get_single_Workout)

//post a new workout
router.post('/', workoutController.createWorkout)

//delete a workout
router.delete('/:id', workoutController.delete_Workout)

//update the workout
router.patch('/:id', workoutController.update_Workout)

module.exports = router