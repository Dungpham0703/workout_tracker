import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { Trash2 } from "lucide-react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const API_BASE = import.meta.env.PROD
  ? "https://workout-tracker-qvoz.vercel.app/"
  : "";

export default function WorkoutDetails({ workout }) {
  const { dispatch } = useWorkoutContext();

  async function handleDelete() {
    try {
      const res = await fetch(`${API_BASE}/api/workouts/${workout._id}`, {
        method: "DELETE",
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Failed to delete workout");
      }

      // Cập nhật context sau khi xóa
      dispatch({ type: "DELETE_WORKOUT", payload: workout });
    } catch (err) {
      console.error("Delete error:", err.message);
      alert("❌ Could not delete workout. Please try again.");
    }
  }

  return (
    <div className="relative max-w-xl p-6 mx-auto my-6 bg-white shadow-md rounded-2xl">
      {/* Nút xoá */}
      <button
        onClick={handleDelete}
        className="absolute text-red-500 top-3 right-3 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>

      {/* Thông tin workout */}
      <h1 className="mb-4 text-xl font-semibold text-green-700">
        {workout.title}
      </h1>

      <p className="text-gray-700">
        <span className="font-semibold">Load (kg):</span> {workout.load}
      </p>

      <p className="text-gray-700">
        <span className="font-semibold">Reps:</span> {workout.reps}
      </p>

      {/* Thời gian tạo */}
      <p className="mt-2 text-sm text-gray-500">
        {formatDistanceToNow(new Date(workout.createdAt), {
          addSuffix: true,
        })}
      </p>
    </div>
  );
}
