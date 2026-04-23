import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

export default function App() {
  const { currentUser, logout } = useAuth();
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [authScreen, setAuthScreen] = useState("login");

  if (!currentUser) {
    return authScreen === "login" ? (
      <Login onSwitch={() => setAuthScreen("register")} />
    ) : (
      <Register onSwitch={() => setAuthScreen("login")} />
    );
  }

  function addBook(book) {
    setBooks([{ ...book, id: Date.now() }, ...books]);
    setShowForm(false);
  }

  function deleteBook(id) {
    setBooks(books.filter((b) => b.id !== id));
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
            <span>
              Hi, <strong>{currentUser.username}</strong>
            </span>
            <button className="logout-btn" onClick={logout}>
              Log out
            </button>
          </div>
        </div>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ Log a Book"}
        </button>
      </header>

      {showForm && <BookForm onAdd={addBook} />}

      <main>
        {books.length === 0 ? (
          <p className="empty">No books logged yet. Start by adding one!</p>
        ) : (
          <BookList books={books} onDelete={deleteBook} />
        )}
      </main>
    </div>
  );
}
