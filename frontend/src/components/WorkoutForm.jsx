import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const API_BASE = "http://13.239.236.251:4000"

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
      const res = await fetch(`${API_BASE}/api/workouts`, {
        method: "POST",
        body: JSON.stringify(workout),
        headers: { "Content-Type": "application/json" },
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Failed to add workout");
        setEmptyFields(json.emptyFields || []);
        return;
      }

      // Reset form
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);

      // Update context
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    } catch (err) {
      console.error("Submit error:", err.message);
      setError("Something went wrong. Please try again.");
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
              className={`w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none
                ${emptyFields.includes("title") ? "border-red-500" : "border-gray-300"}`}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Load (kg)</label>
            <input
              type="number"
              value={load}
              min={1}
              onChange={(e) => setLoad(Number(e.target.value))}
              placeholder="60"
              className={`w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none
                ${emptyFields.includes("load") ? "border-red-500" : "border-gray-300"}`}
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Reps</label>
            <input
              type="number"
              value={reps}
              min={1}
              onChange={(e) => setReps(Number(e.target.value))}
              placeholder="10"
              className={`w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none
                ${emptyFields.includes("reps") ? "border-red-500" : "border-gray-300"}`}
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
