// here we will be making our functional component
import useAxios from "../hooks/useAxios";
import axios from "../apis/dadjokes";

const Jokes = () => {
  const [joke, error, loading] = useAxios({
    axiosInstance: axios,
    method: "GET",
    url: "/",
    requestConfig: {
      headers: {
        "Content-Language": "en-US",
      },
    },
  });
  return (
    <article>
      <h2>Random Dad Joke</h2>
      {loading && <p>Loading...</p>}
      {!loading && error && <p className="errMsg">{error}</p>}
      {!loading && !error && joke && <p>{joke?.joke}</p>}
      {!loading && !error && !joke && <p>No dad joke to display.</p>}
    </article>
  );
};

export default Jokes;
