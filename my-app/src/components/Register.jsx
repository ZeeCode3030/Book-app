import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Register({ onSwitch }) {
  const { register } = useAuth()
  const [form, setForm] = useState({ username: '', password: '', confirm: '' })
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    const result = register(form.username.trim(), form.password)
    if (result.error) setError(result.error)
  }

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1 className="auth-logo">Booked</h1>
        <h2>Create an account</h2>

        {error && <p className="auth-error">{error}</p>}

        <label>
          Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Choose a username"
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
            placeholder="At least 6 characters"
            required
          />
        </label>

        <label>
          Confirm Password
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Repeat your password"
            required
          />
        </label>

        <button type="submit">Register</button>

        <p className="auth-switch">
          Already have an account?{' '}
          <button type="button" className="link-btn" onClick={onSwitch}>
            Log in
          </button>
        </p>
      </form>
    </div>
  )
}
