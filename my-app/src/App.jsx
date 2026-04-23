import { useState, useEffect } from 'react'
import { useAuth } from './context/AuthContext'
import { booksApi } from './services/api'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'

function App() {
  const { currentUser, logout } = useAuth()
  const [books, setBooks] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [authScreen, setAuthScreen] = useState('login')
  const [loading, setLoading] = useState(!!currentUser)

  useEffect(() => {
    if (!currentUser) return
    let active = true
    booksApi.getAll()
      .then(data => { if (active) setBooks(data) })
      .catch(console.error)
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [currentUser])

  if (!currentUser) {
    return authScreen === 'login'
      ? <Login onSwitch={() => setAuthScreen('register')} />
      : <Register onSwitch={() => setAuthScreen('login')} />
  }

  async function addBook(book) {
    try {
      const saved = await booksApi.add({
        title: book.title,
        author: book.author,
        genre: book.genre,
        rating: book.rating,
        review: book.review,
        date_read: book.dateRead,
      })
      setBooks([saved, ...books])
      setShowForm(false)
    } catch (err) {
      alert(err.message)
    }
  }

  async function deleteBook(id) {
    try {
      await booksApi.remove(id)
      setBooks(books.filter(b => b.id !== id))
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="app">
      <header>
        <div className="header-top">
          <div>
            <h1>Booked</h1>
            <p>Your personal reading log</p>
          </div>
          <div className="header-user">
            <span>Hi, <strong>{currentUser.username}</strong></span>
            <button className="logout-btn" onClick={logout}>Log out</button>
          </div>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Log a Book'}
        </button>
      </header>

      {showForm && <BookForm onAdd={addBook} />}

      <main>
        {loading
          ? <p className="empty">Loading your books...</p>
          : books.length === 0
            ? <p className="empty">No books logged yet. Start by adding one!</p>
            : <BookList books={books} onDelete={deleteBook} />
        }
      </main>
    </div>
  )
}

export default App
