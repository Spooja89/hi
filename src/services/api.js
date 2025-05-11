import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // adjust as per your backend
  withCredentials: true, // if using cookies/sessions
});

export default api;
