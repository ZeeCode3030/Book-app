import StarRating from "./StarRating";

export default function BookCard({ book, onDelete }) {
  return (
    <div className="book-card">
      <div className="book-card-header">
        <div>
          <h3>{book.title}</h3>
          <p className="author">by {book.author}</p>
        </div>
        <button className="delete-btn" onClick={() => onDelete(book.id)}>
          ✕
        </button>
      </div>

      {book.genre && <span className="genre-tag">{book.genre}</span>}

      <StarRating rating={book.rating} />

      {book.review && <p className="review">"{book.review}"</p>}

      {book.dateRead && (
        <p className="date">
          Read on {new Date(book.dateRead).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
