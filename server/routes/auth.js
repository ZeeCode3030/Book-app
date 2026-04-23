const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')

const router = express.Router()
const SALT_ROUNDS = 12

function generateToken(user) {
  return jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' })
  }
  if (username.trim().length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters.' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' })
  }

  const existing = db.prepare('SELECT id FROM users WHERE LOWER(username) = LOWER(?)').get(username.trim())
  if (existing) {
    return res.status(409).json({ error: 'Username already taken.' })
  }

  try {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS)
    const result = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)').run(username.trim(), hashed)
    const user = { id: result.lastInsertRowid, username: username.trim() }
    res.status(201).json({ token: generateToken(user), user })
  } catch {
    res.status(500).json({ error: 'Registration failed.' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' })
  }

  const row = db.prepare('SELECT * FROM users WHERE LOWER(username) = LOWER(?)').get(username.trim())
  if (!row) {
    return res.status(401).json({ error: 'Invalid username or password.' })
  }

  try {
    const match = await bcrypt.compare(password, row.password)
    if (!match) {
      return res.status(401).json({ error: 'Invalid username or password.' })
    }
    const user = { id: row.id, username: row.username }
    res.json({ token: generateToken(user), user })
  } catch {
    res.status(500).json({ error: 'Login failed.' })
  }
})

module.exports = router
