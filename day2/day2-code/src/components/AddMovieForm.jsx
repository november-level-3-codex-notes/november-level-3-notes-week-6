import React, { useState } from "react";
import { supabase } from "../utils/supabase";
import "./AddMovieForm.css";

function AddMovieForm() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [details, setDetails] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !genre || !year || !details) {
      alert("Please fill in all fields!");
      return;
    }

    await supabase.from("movies").insert({
      title,
      genre,
      year: Number(year),
      details,
    });

    clearForm();
  }

  function clearForm() {
    setTitle("");
    setGenre("");
    setYear("");
    setDetails("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Movie</h3>

      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>
        Genre:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </label>

      <label>
        Year:
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </label>

      <label>
        Details:
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      </label>
      <button type="submit">Add Movie</button>
    </form>
  );
}

export default AddMovieForm;
