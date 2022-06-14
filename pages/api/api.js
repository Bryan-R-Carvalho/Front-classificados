import axios from "axios";

const api = axios.create({
  daseURL: "https://classificados-back2.herokuapp.com",
});

api.defaults.headers.post["Content-Type"] = "application/json";

export default api;
