import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../api.js'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchCollection('workouts')
      .then((data) => setWorkouts(data))
      .catch((loadError) => setError(loadError.message || 'Unable to load workouts'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container py-4">
      <div className="mb-3">
        <h1>Workouts</h1>
        <p className="text-muted">API endpoint: <code>{buildApiUrl('workouts')}</code></p>
      </div>

      {error && <div className="alert alert-danger">Error: {error}</div>}
      {loading && <div className="alert alert-secondary">Loading workouts…</div>}
      {!loading && workouts.length === 0 && <div className="alert alert-warning">No workouts were found.</div>}

      {!loading && workouts.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Difficulty</th>
                <th>Focus Area</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id || workout.id || JSON.stringify(workout)}>
                  <td>{workout.title || 'Unknown'}</td>
                  <td>{workout.type || '—'}</td>
                  <td>{workout.durationMinutes ?? '—'} min</td>
                  <td>{workout.difficulty || '—'}</td>
                  <td>{workout.focusArea || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Workouts
