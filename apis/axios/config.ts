import axios from "axios";

export const baseAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: process.env.EXPO_PUBLIC_API_KEY,
  },
});

export const staticImageLink = "https://image.tmdb.org/t/p/";
