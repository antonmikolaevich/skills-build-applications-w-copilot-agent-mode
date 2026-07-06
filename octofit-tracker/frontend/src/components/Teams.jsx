import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../api.js'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchCollection('teams')
      .then((data) => setTeams(data))
      .catch((loadError) => setError(loadError.message || 'Unable to load teams'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container py-4">
      <div className="mb-3">
        <h1>Teams</h1>
        <p className="text-muted">API endpoint: <code>{buildApiUrl('teams')}</code></p>
      </div>

      {error && <div className="alert alert-danger">Error: {error}</div>}
      {loading && <div className="alert alert-secondary">Loading teams…</div>}
      {!loading && teams.length === 0 && <div className="alert alert-warning">No teams were found.</div>}

      {!loading && teams.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Sport</th>
                <th>Members</th>
                <th>Score</th>
                <th>Captain</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id || team.id || JSON.stringify(team)}>
                  <td>{team.name || 'Unknown'}</td>
                  <td>{team.sport || '—'}</td>
                  <td>{team.members ?? '—'}</td>
                  <td>{team.score ?? '—'}</td>
                  <td>{team.captain?.name || team.captain || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Teams
