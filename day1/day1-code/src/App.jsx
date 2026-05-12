import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import MovieTable from "./components/MovieTable";
import Pagination from "./components/Pagination";
import MovieForm from "./components/MovieForm";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [genre, setGenre] = useState("");
  const pageSize = 10;

  useEffect(() => {
    async function getMovies() {
      setLoading(true);

      const from = page * pageSize;
      const to = from + pageSize - 1;

      let query = supabase
        .from("movies")
        .select("*", { count: "exact" })
        .range(from, to);

      if (genre) {
        query = query.eq("genre", genre);
      }

      const { data, count } = await query;

      setNumberOfPages(Math.ceil(count / pageSize) - 1);
      setMovies(data);
      setLoading(false);
    }

    getMovies();
  }, [page, genre]);

  return (
    <div className="app">
      <h1>Movie List</h1>
      <MovieForm setGenre={setGenre} />
      <MovieTable movies={movies} loading={loading} pageSize={pageSize} />
      <Pagination setPage={setPage} page={page} numberOfPages={numberOfPages} />
    </div>
  );
}

export default App;
