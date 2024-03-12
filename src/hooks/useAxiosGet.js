import axios from "axios";
import { useState, useEffect } from "react";

const useAxiosGet = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [axiosGetError, setAxiosGetError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    const getAxiosData = async () => {
      try {
        const res = await axios.get(url, {
          signal: controller.signal,
        });
        setData(res.data);
        setAxiosGetError("");
        setIsLoading(false);
      } catch (error) {
        if (!controller.signal.aborted) {
          setAxiosGetError(error.message);
          setData([]);
          setIsLoading(false);
        }
      }
    };
    const cleanup = () => {
      controller.abort();
      setData([]);
      setAxiosGetError("");
      setIsLoading(true);
    };
    getAxiosData();
    return cleanup;
  }, [url]);

  return { data, isLoading, axiosGetError };
};
export default useAxiosGet;
