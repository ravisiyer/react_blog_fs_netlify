import axios from "axios";

const axiosAPI = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export default axiosAPI;
