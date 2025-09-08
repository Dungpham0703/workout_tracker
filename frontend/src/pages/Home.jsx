import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm"
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import PracticeReducer from "../hooks/Pratice_Context";

const Home = () => {
    const {workouts, dispatch} = useWorkoutContext()


    useEffect(() => {
        const fetchWorkout = async () => {
            try {
                const res = await fetch('/api/workouts/')
                const data = await res.json()

                if (res.ok) {
                    dispatch({type: 'SET_WORKOUTS', payload: data})
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchWorkout()
    }, [dispatch])

    return (
        <div className="flex items-start justify-between gap-6 px-6">
            <div className="flex-1">
                {workouts && workouts.map((workout) => (
                    <WorkoutDetails
                        key={workout._id}
                        workout={workout}
                    />
                ))}
            </div>

            <div className="w-1/3">
                <WorkoutForm />
            </div>
        </div>
    );

};

export default Home;
