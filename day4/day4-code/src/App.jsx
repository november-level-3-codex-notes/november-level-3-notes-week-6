import { useEffect, useState } from "react";
import { supabase } from "./utils/supabase";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [details, setDetails] = useState("");

  const [editingMovie, setEditingMovie] = useState(null);

  async function getMovies() {
    const { data } = await supabase.from("movies").select("*").order("id");
    setMovies(data);
  }

  useEffect(() => {
    getMovies();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();

    await supabase.from("movies").insert({
      title,
      genre,
      year,
      details,
    });

    clearForm();
    getMovies();
  }

  async function handleDelete(m) {
    await supabase.from("movies").delete().eq("id", m.id);
    getMovies();
  }

  async function handleUpdate(e) {
    e.preventDefault();

    await supabase
      .from("movies")
      .update({
        title: editingMovie.title,
        genre: editingMovie.genre,
        year: editingMovie.year,
        details: editingMovie.details,
      })
      .eq("id", editingMovie.id);

    setEditingMovie(null);
    getMovies();
  }

  function clearForm() {
    setTitle("");
    setGenre("");
    setYear("");
    setDetails("");
  }
  return (
    <>
      <h1>Movies</h1>

      {/* ADD FORM */}
      <form onSubmit={handleAdd}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
        />
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          type="text"
          placeholder="Genre"
        />
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          type="number"
        />
        <br />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="Details"
        ></textarea>

        <br />
        <button type="submit">Add</button>
      </form>

      <ul>
        {movies.map((m) => {
          return (
            <li key={m.id}>
              {m.title}
              <br />
              {editingMovie?.id === m.id ? (
                <form onSubmit={handleUpdate}>
                  <input
                    value={editingMovie.title}
                    onChange={(e) =>
                      setEditingMovie({
                        ...editingMovie,
                        title: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Title"
                  />
                  <input
                    value={editingMovie.genre}
                    onChange={(e) =>
                      setEditingMovie({
                        ...editingMovie,
                        genre: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Genre"
                  />
                  <input
                    value={editingMovie.year}
                    onChange={(e) =>
                      setEditingMovie({ ...editingMovie, year: e.target.value })
                    }
                    type="number"
                  />
                  <br />
                  <textarea
                    value={editingMovie.details}
                    onChange={(e) =>
                      setEditingMovie({
                        ...editingMovie,
                        details: e.target.value,
                      })
                    }
                    placeholder="Details"
                  ></textarea>
                  <br />
                  <button type="submit">Save</button>
                </form>
              ) : (
                <>
                  <button onClick={() => setEditingMovie(m)}>Edit</button>
                  <button onClick={() => handleDelete(m)}>Delete</button>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
