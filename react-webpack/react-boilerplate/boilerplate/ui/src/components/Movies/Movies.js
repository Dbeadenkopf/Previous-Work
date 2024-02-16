import React from "react";
import { getMovies, addMovie } from "../../redux/actions/movies";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectMovies } from "../../redux/selectors/movies";

const Movies = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector(selectMovies);

  const [title, setTitle] = React.useState("");
  const [release_date, setReleaseDate] = React.useState("");
  const [overview, setOverview] = React.useState("");

  React.useEffect(() => {
    dispatch(getMovies());
  }, []);

  return (
    <>
      <h1>Movies</h1>

      <div>
        <input
          placeholder="enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="enter release date"
          onChange={(e) => setReleaseDate(e.target.value)}
        />
        <input
          placeholder="enter overview"
          onChange={(e) => setOverview(e.target.value)}
        />
        <button
          onClick={() => dispatch(addMovie({ title, release_date, overview }))}
        >
          Add movie
        </button>
        <p>Added movies will appear at the bottom of the list.</p>
      </div>

      {movies.map((p, i) => (
        <ul key={i}>
          <li>
            <b>{p.title}</b>
          </li>
          <li>{p.release_date}</li>
          <li>{p.overview}</li>
          <br />
        </ul>
      ))}
    </>
  );
};

export default Movies;
