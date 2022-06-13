import axios from "axios";

const api = axios.create({
  //baseURL: "https://classificados-back2.herokuapp.com",
  baseURL: "https://classificadosmacae.herokuapp.com",
  //baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

export default api;
