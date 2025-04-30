import axios from "axios";

export const URL = axios.create({
  baseURL: "http://localhost:4000/",
  withCredentials: true,
});
