import axios from "axios";

// export const url = "http://13.127.199.56:5005";
export const url = "http://localhost:5005";

export default axios.create({
  baseURL: url,
});
