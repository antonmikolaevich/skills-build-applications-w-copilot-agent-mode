import { useEffect, useState } from 'react'
import { buildApiUrl, fetchCollection } from '../api.js'

function stringifyReference(value) {
  if (!value) return '—'
  if (typeof value === 'object') {
    return value.name || String(value)
  }
  return String(value)
}

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetchCollection('users')
      .then((data) => setUsers(data))
      .catch((loadError) => setError(loadError.message || 'Unable to load users'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section className="container py-4">
      <div className="mb-3">
        <h1>Users</h1>
        <p className="text-muted">API endpoint: <code>{buildApiUrl('users')}</code></p>
      </div>

      {error && <div className="alert alert-danger">Error: {error}</div>}
      {loading && <div className="alert alert-secondary">Loading users…</div>}
      {!loading && users.length === 0 && <div className="alert alert-warning">No users were found.</div>}

      {!loading && users.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Fitness Level</th>
                <th>City</th>
                <th>Age</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id || user.id || JSON.stringify(user)}>
                  <td>{user.name || 'Unknown'}</td>
                  <td>{user.email || '—'}</td>
                  <td>{user.fitnessLevel || '—'}</td>
                  <td>{user.city || '—'}</td>
                  <td>{user.age ?? '—'}</td>
                  <td>{stringifyReference(user.team)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
