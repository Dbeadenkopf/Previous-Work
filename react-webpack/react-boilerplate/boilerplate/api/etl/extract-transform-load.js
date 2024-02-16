import fetch from "node-fetch";
import { MongoClient } from "mongodb";

var url = "mongodb://localhost:27031";

export const load = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=ecee8965df3010e0137f48bdebe10470&with_genres=27"
    );
    const headerDate =
      res.headers && res.headers.get("date")
        ? res.headers.get("date")
        : "no response date";
    console.log("Status Code:", res.status);
    console.log("Date in Response header:", headerDate);

    const movies = await res.json();

    transform(movies.results);
  } catch (err) {
    console.log(err.message); //can be console.error
  }
};

const transform = (movies) => {
  const cleanedMoviesArray = [];
  for (let i = 0; i < movies.length; i++) {
    const movieObject = {
      title: movies[i].title,
      release_date: movies[i].release_date,
      overview: movies[i].overview,
    };

    cleanedMoviesArray.push(movieObject);
  }
  insertHorrorMovies(cleanedMoviesArray);
};

const insertHorrorMovies = (movies) => {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("movies");

    dbo.collection("horrorMovies").insertMany(movies, function (err, res) {
      if (err) throw err;
      console.log("movies inserted");
      db.close();
    });
  });
};

load();
