import { useState } from 'react'
import BookForm from './components/BookForm'
import BookList from './components/BookList'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [showForm, setShowForm] = useState(false)

  function addBook(book) {
    setBooks([...books, { ...book, id: Date.now() }])
    setShowForm(false)
  }

  function deleteBook(id) {
    setBooks(books.filter(b => b.id !== id))
  }

  return (
    <div className="app">
      <header>
        <h1>Booked</h1>
        <p>Your personal reading log</p>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Log a Book'}
        </button>
      </header>

      {showForm && <BookForm onAdd={addBook} />}

      <main>
        {books.length === 0
          ? <p className="empty">No books logged yet. Start by adding one!</p>
          : <BookList books={books} onDelete={deleteBook} />
        }
      </main>
    </div>
  )
}

export default App
