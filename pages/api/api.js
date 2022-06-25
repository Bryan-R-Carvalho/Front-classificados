import axios from "axios";

const api = axios.create({
  baseURL: "https://classificados-back2.herokuapp.com",
  headers: { "Content-Type": "application/json" },
});

api.defaults.headers.post["Content-Type"] = "application/json";
api.defaults.headers.put["Content-Type"] = "application/json";

export default api;
