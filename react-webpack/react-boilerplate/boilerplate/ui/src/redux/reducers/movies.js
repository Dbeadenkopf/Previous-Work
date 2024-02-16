import * as actions from "../actions/movies";
import { createReducer } from "@reduxjs/toolkit";

export const initialState = {
  movies: [],
  getMoviesRequest: {
    error: "",
    fetching: false,
    success: false,
  },
  addMovieRequest: {
    error: "",
    fetching: false,
    success: false,
  },
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.getMovies.pending, (state) => {
      state.getMoviesRequest = {
        ...initialState.getMoviesRequest,
        fetching: true,
      };
    })
    .addCase(actions.getMovies.fulfilled, (state, action) => {
      state.getMoviesRequest = {
        ...initialState.getMoviesRequest,
        success: true,
      };
      state.movies = action.payload;
    })
    .addCase(actions.getMovies.rejected, (state, action) => {
      state.getMoviesRequest = {
        ...initialState.getMoviesRequest,
        error: action.error.message,
      };
    })
    .addCase(actions.addMovie.pending, (state) => {
      state.addMovieRequest = {
        ...initialState.addMovieRequest,
        fetching: true,
      };
    })
    .addCase(actions.addMovie.fulfilled, (state, action) => {
      state.addMovieRequest = {
        ...initialState.addMovieRequest,
        success: true,
      };
      state.movies.push(action.payload);
    })
    .addCase(actions.addMovie.rejected, (state, action) => {
      state.addMovieRequest = {
        ...initialState.addMovieRequest,
        error: action.error.message,
      };
    });
});

export default reducer;
