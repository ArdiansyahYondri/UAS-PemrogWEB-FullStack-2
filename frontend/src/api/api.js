import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", //  Tolong sesuaikan dengan URL backend Laravel kamu
  withCredentials: true,
});

export default api;
