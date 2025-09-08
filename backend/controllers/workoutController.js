const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

// get all workouts
const getWorkouts = async (req, res) => {
    const workouts = await Workout.find({}).sort({createAt: -1})
    res.status(200).json(workouts)
}
// get a single workouts
const get_single_Workout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({err: 'No such workouts for this id'})
    }

    const workout = await Workout.findById(id)    
    
    return res.status(200).json(workout)
}
//create new workout
const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body

    let emptyFields = []

    if (!title) emptyFields.push('title')
    
    if (!load) emptyFields.push('load')

    if (!reps) emptyFields.push('reps')

    if (emptyFields.length > 0 ) {
        res.status(400).json({error : 'Please fill all the fields', emptyFields})
    }
    
    // add doc to database
    try {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

//delete a workout
const delete_Workout = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({err: 'No such workout to delete'})
    }
        await Workout.findByIdAndDelete({_id: id})
        res.status(200).json({mess: 'Finish delete the workout'})
}

//update a workout
const update_Workout = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({err: 'No such the workout to update'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        res.status(404).json({err: 'You need to add the changes'})
    }

    res.status(200).json(workout)
}

const updated_Workout = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({message: 'No workout for this id'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id}, { ...req.body})

    if(!workout) {
        res.status(404).json({message: 'Nothing to update'})
    }

    res.status(200).json(workout)
}

const get_all_workout = async (req, res) => {
    
    const workout = await Workout.find()
    
    if(!workout) {
        res.status(404).json({mess: 'No workout to respond'})
    }

    res.status(200).json(workout)

}

module.exports = {
    createWorkout,
    getWorkouts,
    get_single_Workout,
    delete_Workout,
    update_Workout
}