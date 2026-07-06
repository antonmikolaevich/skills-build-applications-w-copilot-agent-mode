import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchCollection('activities')
      .then((data) => setActivities(data))
      .catch((loadError) => setError(loadError.message || 'Unable to load activities'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container py-4">
      <div className="mb-3">
        <h1>Activities</h1>
        <p className="text-muted">API endpoint: <code>{buildApiUrl('activities')}</code></p>
      </div>

      {error && <div className="alert alert-danger">Error: {error}</div>}
      {loading && <div className="alert alert-secondary">Loading activities…</div>}
      {!loading && activities.length === 0 && <div className="alert alert-warning">No activities were found.</div>}

      {!loading && activities.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Distance</th>
                <th>Logged At</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || JSON.stringify(activity)}>
                  <td>{activity.user?.name || activity.user || 'Unknown'}</td>
                  <td>{activity.type || '—'}</td>
                  <td>{activity.durationMinutes ?? '—'} min</td>
                  <td>{activity.caloriesBurned ?? '—'}</td>
                  <td>{activity.distanceKm ?? '—'} km</td>
                  <td>{activity.loggedAt ? new Date(activity.loggedAt).toLocaleString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
