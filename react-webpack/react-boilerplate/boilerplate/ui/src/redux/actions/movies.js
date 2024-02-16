import { createAsyncThunk } from "@reduxjs/toolkit";

export const getMovies = createAsyncThunk("movies/getMovies", async () => {
  const response = await fetch("http://localhost:80/api/movies");

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  const data = await response.json();

  return data;
});

export const addMovie = createAsyncThunk("movies/addMovie", async (movie) => {
  const response = await fetch("http://localhost:80/api/movies/post", {
    method: "POST",
    body: JSON.stringify(movie),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  const data = await response.json();

  return data[0];
});
