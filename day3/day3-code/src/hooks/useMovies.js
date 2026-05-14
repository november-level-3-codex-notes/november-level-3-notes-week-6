/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const PAGE_SIZE = 10;

function useMovies(page, genre) {
  const [movies, setMovies] = useState([]);
  const [numberOfPages, setNumberOfPages] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getMovies() {
    setLoading(true);

    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from("movies")
      .select("*", { count: "exact" })
      .range(from, to)
      .order("id", { ascending: true });

    if (genre) {
      query = query.eq("genre", genre);
    }

    const { data, count } = await query;

    setNumberOfPages(Math.ceil(count / PAGE_SIZE) - 1);
    setMovies(data);
    setLoading(false);
  }

  useEffect(() => {
    getMovies();
  }, [page, genre]);

  return { movies, numberOfPages, loading, getMovies };
}

export default useMovies;
