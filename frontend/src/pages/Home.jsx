import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const API_BASE = import.meta.env.PROD
  ? "https://workout-tracker-qvoz.vercel.app/"
  : "";

export default function Home() {
  const { workouts, dispatch } = useWorkoutContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ctrl = new AbortController();

    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${API_BASE}/api/workouts`, {
          signal: ctrl.signal,
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || `Fetch failed (${res.status})`);
        }

        const sorted = Array.isArray(data)
          ? [...data].sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            )
          : data;

        dispatch({ type: "SET_WORKOUTS", payload: sorted });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(err.message || "Something went wrong while fetching.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
    return () => ctrl.abort();
  }, [dispatch]);

  return (
    <div className="px-6">
      <div className="grid items-start gap-6 lg:grid-cols-3">
        {/* List workouts */}
        <div className="lg:col-span-2">
          {loading && (
            <div className="p-4 text-sm text-gray-600">Loading workouts…</div>
          )}

          {error && (
            <div className="p-3 mb-3 text-sm text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          {!loading && !error && (!workouts || workouts.length === 0) && (
            <div className="p-4 text-sm text-gray-600">
              No workouts yet. Add your first one →
            </div>
          )}

          {workouts?.map((w) => (
            <WorkoutDetails key={w._id} workout={w} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <WorkoutForm />
        </div>
      </div>
    </div>
  );
}
