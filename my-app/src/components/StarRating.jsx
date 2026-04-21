function StarRating({ rating, onRate }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          className={star <= rating ? 'star filled' : 'star'}
          onClick={() => onRate && onRate(star)}
          style={{ cursor: onRate ? 'pointer' : 'default' }}
        >
          ★
        </span>
      ))}
    </div>
  )
}

export default StarRating
