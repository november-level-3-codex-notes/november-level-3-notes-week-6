import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const PAGE_SIZE = 10;

function useMovies(page, genre) {
  const [movies, setMovies] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMovies() {
      setLoading(true);

      const from = page * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;

      let query = supabase
        .from("movies")
        .select("*", { count: "exact" })
        .range(from, to);

      if (genre) {
        query = query.eq("genre", genre);
      }

      const { data, count } = await query;

      setNumberOfPages(Math.ceil(count / PAGE_SIZE) - 1);
      setMovies(data);
      setLoading(false);
    }

    getMovies();
  }, [page, genre]);

  return { movies, numberOfPages, loading };
}

export default useMovies;
