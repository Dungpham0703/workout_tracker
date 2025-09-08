import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { Trash2 } from "lucide-react";

//data fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();

  const handleDelete = async () => {
    const res = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE"
    });

    const json = await res.json();
    console.log(json)

    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: workout })
    }
  };

  return (
    <div className="relative max-w-xl p-6 mx-auto my-6 bg-white shadow-md rounded-2xl">
      <button
        onClick={handleDelete}
        className="absolute text-red-500 top-3 right-3 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>

      <h1 className="mb-4 text-xl font-semibold text-green-700">
        {workout.title}
      </h1>

      <p className="text-gray-700">
        <span className="font-semibold">Load (kg):</span> {workout.load}
      </p>

      <p className="text-gray-700">
        <span className="font-semibold">Reps:</span> {workout.reps}
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {formatDistanceToNow(new Date(workout.createdAt), { addSurrfix: true })} </p>
    </div>
  );
};

export default WorkoutDetails;
