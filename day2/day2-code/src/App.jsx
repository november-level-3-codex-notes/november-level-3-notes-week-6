import { useState } from "react";
import MovieTable from "./components/MovieTable";
import Pagination from "./components/Pagination";
import MovieForm from "./components/MovieForm";
import useMovies from "./hooks/useMovies";
import AuthForm from "./components/AuthForm";
import AddMovieForm from "./components/AddMovieForm";
import "./App.css";

const PAGE_SIZE = 10;

function App() {
  const [page, setPage] = useState(0);
  const [genre, setGenre] = useState("");
  const { movies, numberOfPages, loading } = useMovies(page, genre);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <div className="app">
      <h1>Movie List</h1>
      <AuthForm setCurrentUser={setCurrentUser} currentUser={currentUser} />

      {currentUser && (
        <>
          <AddMovieForm />
          <MovieForm setGenre={setGenre} />
          <MovieTable movies={movies} loading={loading} pageSize={PAGE_SIZE} />
          <Pagination
            setPage={setPage}
            page={page}
            numberOfPages={numberOfPages}
          />
        </>
      )}
    </div>
  );
}

export default App;
