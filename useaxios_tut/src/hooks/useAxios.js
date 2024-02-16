// THis file will contain our axios hooks
import { useState, useEffect } from "react";

const useAxios = (configObj) => {
  // create config obj
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // lets put the bulk of our hooks in useeffect
  // we start with an empty dependency array
  useEffect(() => {
    // create out controller, this also handles memory leak
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        console.log(res); // log to see the data
        setResponse(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();

    // use effect cleanup function
    // need this return so we can cancle our memeory leek
    return () => controller.abort();
  }, []);

  // lets return all of our values
  // at the end of the hook
  return [response, error, loading];
};

export default useAxios;
