const express = require('express')
const db = require('../db')
const requireAuth = require('../middleware/auth')

const router = express.Router()

// All routes require a valid JWT
router.use(requireAuth)

// GET /api/books — fetch logged-in user's books
router.get('/', (req, res) => {
  const books = db.prepare('SELECT * FROM books WHERE user_id = ? ORDER BY created_at DESC').all(req.user.id)
  res.json(books)
})

// POST /api/books — add a book
router.post('/', (req, res) => {
  const { title, author, genre, rating, review, date_read } = req.body

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required.' })
  }

  const result = db.prepare(
    'INSERT INTO books (user_id, title, author, genre, rating, review, date_read) VALUES (?, ?, ?, ?, ?, ?, ?)'
  ).run(req.user.id, title, author, genre || null, rating || 0, review || null, date_read || null)

  const book = db.prepare('SELECT * FROM books WHERE id = ?').get(result.lastInsertRowid)
  res.status(201).json(book)
})

// DELETE /api/books/:id — delete a book (only owner can delete)
router.delete('/:id', (req, res) => {
  const book = db.prepare('SELECT * FROM books WHERE id = ? AND user_id = ?').get(req.params.id, req.user.id)
  if (!book) {
    return res.status(404).json({ error: 'Book not found.' })
  }
  db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id)
  res.json({ success: true })
})

module.exports = router
