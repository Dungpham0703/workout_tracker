import { useState } from "react"
import { useWorkoutContext } from "../hooks/useWorkoutContext"

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext()
  const [title, setTitle] = useState("")
  const [load, setLoad] = useState("")
  const [reps, setReps] = useState("")
  const [error, setError] = useState(null)
  const [emptyField, setEmptyField] = useState([])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const workout = { title, load, reps }

    const res = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const json = await res.json()

    console.log(json)
    
    if (!res.ok) {
      setError(json.error)
      setEmptyField(json.emptyField)
      console.log(json.emptyField)
    }

    if (res.ok) {
      setTitle("")
      setLoad("")
      setReps("")
      setError(null)
      setEmptyField([])
      console.log(json)
      dispatch({ type: 'CREATE_WORKOUT', payload: json})
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
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
              placeholder="Bench Press"
              className="w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Load (kg)</label>
            <input
              onChange={(e) => setLoad(Number(e.target.value))}
              type="number"
              value={load}
              placeholder="60"
              min={1}
              className="w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Reps</label>
            <input
              onChange={(e) => setReps(Number(e.target.value))}
              type="number"
              value={reps}
              placeholder="10"
              min={1}
              className="w-full px-3 py-1.5 border rounded-md text-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none"
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
  )
}

export default WorkoutForm
