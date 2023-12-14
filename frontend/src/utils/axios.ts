import axios from "axios";

export const url = "http://localhost:5000";

export default axios.create({
  baseURL: url,
});
