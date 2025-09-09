import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { Trash2 } from "lucide-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const API = import.meta.env.VITE_API_URL; // e.g. https://workout-tracker.vercel.app/api

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();

  async function handleDelete() {
    try {
      const res = await fetch(`${API}/workouts/${workout._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      // Nếu server trả body rỗng thì tránh .json() bị lỗi
      const text = await res.text();
      const json = text ? JSON.parse(text) : null;
      console.log(json);

      if (!res.ok) {
        throw new Error(json?.error || `Delete failed (${res.status})`);
      }

      dispatch({ type: "DELETE_WORKOUT", payload: workout });
    } catch (err) {
      console.error(err);
      alert(err.message || "Delete failed");
    }
  }

  return (
    <div className="relative max-w-xl p-6 mx-auto my-6 bg-white shadow-md rounded-2xl">
      <button
        onClick={handleDelete}
        className="absolute text-red-500 top-3 right-3 hover:text-red-700"
        aria-label="Delete workout"
        title="Delete workout"
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
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
}
