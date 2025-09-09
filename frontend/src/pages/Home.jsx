import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
// import PracticeReducer from "../hooks/Pratice_Context"; // chưa dùng -> có thể xoá

const API = import.meta.env.VITE_API_URL; // e.g. https://workout-tracker.vercel.app/api

export default function Home() {
  const { workouts, dispatch } = useWorkoutContext();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        const res = await fetch(`${API}/workouts`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || `Fetch failed (${res.status})`);
        dispatch({ type: "SET_WORKOUTS", payload: data });
      } catch (e) {
        console.error(e);
        setErr(e.message || "Network error");
      } finally {
        setLoading(false);
      }
    }
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="flex flex-col-reverse gap-6 px-6 md:flex-row">
      <div className="flex-1">
        {loading && <p className="text-sm text-gray-500">Loading…</p>}
        {err && <p className="text-sm text-red-600">Error: {err}</p>}

        {!loading && !err && workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>

      <div className="md:w-1/3">
        <WorkoutForm />
      </div>
    </div>
  );
}
