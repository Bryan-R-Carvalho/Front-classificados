import axios from "axios";

const api = axios.create({
  aseURL: "https://classificados-back2.herokuapp.com",
});

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
