import { useEffect, useState } from "react";

const KEY = "7f212130";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);

          setError("");

          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong when fetching movies");

          const data = await res.json();
          // console.log(data);

          if (data.Response === "False") throw new Error("Movie not found");

          setMovies(data.Search);

          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query < 3 || !query) {
        setMovies([]);
        setError("");
        return;
      }

      // handleCloseMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
