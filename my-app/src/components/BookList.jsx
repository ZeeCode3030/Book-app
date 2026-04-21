import BookCard from './BookCard'

function BookList({ books, onDelete }) {
  return (
    <div className="book-list">
      {books.map(book => (
        <BookCard key={book.id} book={book} onDelete={onDelete} />
      ))}
    </div>
  )
}

export default BookList
