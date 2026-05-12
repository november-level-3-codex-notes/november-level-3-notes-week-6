import React, { useState } from "react";
import "./MovieForm.css";

function MovieForm({ setGenre }) {
  const [selectedGenre, setSelectedGenre] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;

    setSelectedGenre(value);
    setGenre(value);
  };

  return (
    <div className="movie-form">
      <p>Filter by genre: </p>
      <select value={selectedGenre} onChange={handleChange}>
        <option value="">All</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Comedy">Comedy</option>
        <option value="Crime">Crime</option>
        <option value="Fantasy">Fantasy</option>
      </select>
    </div>
  );
}

export default MovieForm;
