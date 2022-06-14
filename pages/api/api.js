import axios from "axios";

const api = axios.create({
  //baseURL: "https://classificados-back2.herokuapp.com",
  baseURL: "https://classificadosmacae.herokuapp.com",
  //baseURL: "http://localhost:8080",
});

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
