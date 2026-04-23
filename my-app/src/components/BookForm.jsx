import { useState } from "react";
import StarRating from "./StarRating";

export default function BookForm({ onAdd }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    rating: 0,
    review: "",
    dateRead: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.author) return;
    onAdd(form);
    setForm({
      title: "",
      author: "",
      genre: "",
      rating: 0,
      review: "",
      dateRead: "",
    });
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>Log a Book</h2>

      <label>
        Title *
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Book title"
          required
        />
      </label>

      <label>
        Author *
        <input
          name="author"
          value={form.author}
          onChange={handleChange}
          placeholder="Author name"
          required
        />
      </label>

      <label>
        Genre
        <input
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="e.g. Fiction, Biography"
        />
      </label>

      <label>
        Date Read
        <input
          name="dateRead"
          type="date"
          value={form.dateRead}
          onChange={handleChange}
        />
      </label>

      <label>
        Your Rating
        <StarRating
          rating={form.rating}
          onRate={(r) => setForm({ ...form, rating: r })}
        />
      </label>

      <label>
        Review
        <textarea
          name="review"
          value={form.review}
          onChange={handleChange}
          placeholder="What did you think?"
          rows={4}
        />
      </label>

      <button type="submit">Save Book</button>
    </form>
  );
}
