import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../api.js'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchCollection('leaderboard')
      .then((data) => setEntries(data))
      .catch((loadError) => setError(loadError.message || 'Unable to load leaderboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container py-4">
      <div className="mb-3">
        <h1>Leaderboard</h1>
        <p className="text-muted">API endpoint: <code>{buildApiUrl('leaderboard')}</code></p>
      </div>

      {error && <div className="alert alert-danger">Error: {error}</div>}
      {loading && <div className="alert alert-secondary">Loading leaderboard…</div>}
      {!loading && entries.length === 0 && <div className="alert alert-warning">No leaderboard entries were found.</div>}

      {!loading && entries.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || entry.id || JSON.stringify(entry)}>
                  <td>{entry.rank ?? '—'}</td>
                  <td>{entry.user?.name || entry.username || entry.user || 'Unknown'}</td>
                  <td>{entry.points ?? '—'}</td>
                  <td>{entry.streak ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Leaderboard
