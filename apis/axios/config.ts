import axios from "axios";
import store from "../../redux/store/store";

export const baseAPI = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: process.env.EXPO_PUBLIC_API_KEY,
  },
});

export const staticImageLink = "https://image.tmdb.org/t/p/";

export const yifyApi = axios.create({
  baseURL: "https://yts.mx/api/v2/",
});

export const backendAPI = axios.create({
  baseURL: "https://fullmoviebackend.onrender.com/",
});

const { user } = store.getState();

backendAPI.interceptors.request.use(
  (config) => {
    if (user.isLogin && user.userData.data.token) {
      config.headers["Authorization"] = `Bearer ${user.userData.data.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
