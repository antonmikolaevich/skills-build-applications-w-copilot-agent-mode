import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { API_BASE_URL, isCodespaceApiEnabled } from './api.js'
import './App.css'

function Home() {
  return (
    <section className="container py-4">
      <h1>Octofit Tracker</h1>
      <p className="lead">
        Use the navigation bar to view users, teams, activities, leaderboard, and workouts.
      </p>
      <div className="alert alert-info">
        <p className="mb-1">
          Backend API base URL: <code>{API_BASE_URL}</code>
        </p>
        <p className="mb-0">
          {isCodespaceApiEnabled
            ? 'Using Codespace environment variable VITE_CODESPACE_NAME.'
            : 'VITE_CODESPACE_NAME is not set. Falling back to localhost for local development.'}
        </p>
      </div>
      <p>
        If you are running this app in GitHub Codespaces, define
        <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> to use
        <code>https://{'{'}import.meta.env.VITE_CODESPACE_NAME{'}'}-8000.app.github.dev</code>.
      </p>
    </section>
  )
}

function App() {
  const navLinkClass = ({ isActive }) =>
    `nav-link${isActive ? ' active' : ''}`

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Octofit Tracker
          </NavLink>
          <div className="navbar-nav">
            <NavLink className={navLinkClass} to="/users">
              Users
            </NavLink>
            <NavLink className={navLinkClass} to="/teams">
              Teams
            </NavLink>
            <NavLink className={navLinkClass} to="/activities">
              Activities
            </NavLink>
            <NavLink className={navLinkClass} to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className={navLinkClass} to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
