// this file will contain our Axios instance
import axios from "axios";
const BASE_URL = "https://icanhazdadjoke.com";

// creating our axios instance
export default axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
