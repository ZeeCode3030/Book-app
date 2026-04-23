import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login({ onSwitch }) {
  const { login } = useAuth()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const result = login(form.username.trim(), form.password)
    if (result.error) setError(result.error)
  }

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-logo">Booked</h1>
        <h2>Welcome back</h2>

        {error && <p className="auth-error">{error}</p>}

        <label>
          Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Your username"
            required
            autoFocus
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Your password"
            required
          />
        </label>

        <button type="submit">Log In</button>

        <p className="auth-switch">
          Don't have an account?{' '}
          <button type="button" className="link-btn" onClick={onSwitch}>
            Register
          </button>
        </p>
      </form>
    </div>
  )
}
