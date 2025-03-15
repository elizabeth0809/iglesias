import axios from "axios";

const ApiBackend = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

// interceptors

export { ApiBackend };