import React, { useState, Fragment } from "react";
import Pagination from "./Pagination";

import "./MovieTable.css";
import MovieForm from "./MovieForm";

function MovieTable({ movies, loading, pageSize, getMovies }) {
  const [expandedMovieDetails, setExpandedMovieDetails] = useState({});
  const [showMovieModal, setShowMovieModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const expandDetails = (id) => {
    const selectedMovie = movies.find((movie) => movie.id === id);

    if (expandedMovieDetails.id === id) {
      setExpandedMovieDetails({});
    } else {
      setExpandedMovieDetails(selectedMovie);
    }
  };

  return (
    <>
      <button onClick={() => setShowMovieModal(true)}>Add Movie</button>

      {showMovieModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => {
                setShowMovieModal(false);
                setSelectedMovie(false);
              }}
            >
              X
            </button>
            <MovieForm setShowMovieModal={setShowMovieModal} selectedMovie={selectedMovie} getMovies={getMovies}/>
          </div>
        </div>
      )}

      <table className="movie-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Year</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: pageSize }).map((_, i) => (
                <tr key={i} className="loading-row">
                  <td colSpan={5}>Loading...</td>
                </tr>
              ))
            : movies.map((movie) => {
                return (
                  <Fragment key={movie.id}>
                    <tr
                      className="clickable-row"
                      onClick={() => expandDetails(movie.id)}
                    >
                      <td>{movie.id}</td>
                      <td>{movie.title}</td>
                      <td>{movie.genre}</td>
                      <td>{movie.year}</td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowMovieModal(true);
                            setSelectedMovie(movie);
                          }}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                    {expandedMovieDetails.id === movie.id && (
                      <tr className="details-row">
                        <td colSpan={5}>{movie.details}</td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
        </tbody>
      </table>
    </>
  );
}

export default MovieTable;
