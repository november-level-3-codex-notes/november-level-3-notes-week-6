import React, { useState } from "react";
import { supabase } from "../utils/supabase";
import "./MovieForm.css";

function MovieForm({ selectedMovie, getMovies, setShowMovieModal }) {
  const [title, setTitle] = useState(selectedMovie ? selectedMovie.title : "");
  const [genre, setGenre] = useState(selectedMovie ? selectedMovie.genre : "");
  const [year, setYear] = useState(selectedMovie ? selectedMovie.year : "");
  const [details, setDetails] = useState(
    selectedMovie ? selectedMovie.details : "",
  );

  async function handleDeleteMovie() {
    await supabase.from("movies").delete().eq("id", selectedMovie.id);
    alert("Deleted!");
    clearForm();
    getMovies();
    setShowMovieModal(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!title || !genre || !year || !details) {
      alert("Please fill in all fields!");
      return;
    }

    if (selectedMovie) {
      await supabase
        .from("movies")
        .update({
          title: title,
          genre: genre,
          year: Number(year),
          details: details,
        })
        .eq("id", selectedMovie.id);
      alert("Updated!");
      clearForm();
      getMovies();
    } else {
      await supabase.from("movies").insert({
        title,
        genre,
        year: Number(year),
        details,
      });
      alert("Added!");
      clearForm();
      getMovies();
    }
    setShowMovieModal(false);
  }

  function clearForm() {
    setTitle("");
    setGenre("");
    setYear("");
    setDetails("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>{selectedMovie ? "Update Movie" : "Add Movie"}</h3>

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
      <button type="submit">{selectedMovie ? "Update" : "Add"}</button>
      {selectedMovie && (
        <button type="button" onClick={handleDeleteMovie}>
          Delete
        </button>
      )}
    </form>
  );
}

export default MovieForm;
