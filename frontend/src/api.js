import axios from "axios";

const baseURL = "http://localhost:8008";

export const api = axios.create({
  baseURL,
  validateStatus: () => {
    return true;
  },
});
