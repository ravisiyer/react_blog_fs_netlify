import axios from "axios";
import { useState, useEffect } from "react";

const useAxiosGet = (url, user) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [axiosGetError, setAxiosGetError] = useState({
    message: "",
    unauthorized: false,
    networkError: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    const getAxiosData = async () => {
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Basic ${user.authdata}`,
          },
          signal: controller.signal,
        });
        setData(res.data);
        setAxiosGetError({
          message: "",
          unauthorized: false,
          networkError: false,
        });
        setIsLoading(false);
      } catch (error) {
        if (!controller.signal.aborted) {
          const errData = {
            message: error.message,
            unauthorized: false,
            networkError: false,
          };
          if (error.response && error.response.status === 401)
            errData.unauthorized = true;
          if (!error.response && error.code === "ERR_NETWORK") {
            errData.networkError = true;
          }
          setAxiosGetError(errData);
          setData([]);
          setIsLoading(false);
        }
      }
    };
    const cleanup = () => {
      controller.abort();
      setData([]);
      setAxiosGetError({
        message: "",
        unauthorized: false,
        networkError: false,
      });
      setIsLoading(true);
    };
    getAxiosData();
    return cleanup;
  }, [url, user]);

  return { data, isLoading, axiosGetError };
};
export default useAxiosGet;
