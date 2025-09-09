import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const API = import.meta.env.VITE_API_URL; // https://.../api

export default function WorkoutForm() {
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const workout = { title, load, reps };

    try {
      const res = await fetch(`${API}/workouts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(workout),
      });

      const json = await res.json();
      console.log(json);

      if (!res.ok) {
        setError(json.error || "Failed to add workout");
        setEmptyFields(json.emptyFields || []);
        return;
      }

      // success
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    } catch (err) {
      console.error("API error:", err);
      setError("Network error. Please try again.");
    }
  }

  return (
    <div className="max-w-sm mx-auto mt-6">
      <div className="p-4 bg-white shadow-md rounded-xl">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Add Workout
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1 text-sm text-gray-600">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Bench Press"
              className={`w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
                emptyFields.includes("title") ? "border-red-500" : ""
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Load (kg)</label>
            <input
              type="number"
              min={1}
              value={load}
              onChange={(e) => setLoad(Number(e.target.value))}
              placeholder="60"
              className={`w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
                emptyFields.includes("load") ? "border-red-500" : ""
              }`}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Reps</label>
            <input
              type="number"
              min={1}
              value={reps}
              onChange={(e) => setReps(Number(e.target.value))}
              placeholder="10"
              className={`w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none ${
                emptyFields.includes("reps") ? "border-red-500" : ""
              }`}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-1.5 px-3 rounded-md text-sm font-medium hover:bg-green-900 transition"
          >
            Add Workout
          </button>

          {error && (
            <div className="p-2 mt-2 text-xs text-red-600 bg-red-100 rounded-md">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
