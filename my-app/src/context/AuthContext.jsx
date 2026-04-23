import { createContext, useContext, useState } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('booked_user')
    return saved ? JSON.parse(saved) : null
  })

  function saveSession(token, user) {
    localStorage.setItem('booked_token', token)
    localStorage.setItem('booked_user', JSON.stringify(user))
    setCurrentUser(user)
  }

  async function register(username, password) {
    try {
      const { token, user } = await authApi.register(username, password)
      saveSession(token, user)
      return { success: true }
    } catch (err) {
      return { error: err.message }
    }
  }

  async function login(username, password) {
    try {
      const { token, user } = await authApi.login(username, password)
      saveSession(token, user)
      return { success: true }
    } catch (err) {
      return { error: err.message }
    }
  }

  function logout() {
    localStorage.removeItem('booked_token')
    localStorage.removeItem('booked_user')
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
