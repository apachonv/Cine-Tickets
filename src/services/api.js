import axios from "axios";

const API_KEY = "e17402b56c262bac2abd66b56b3022fc";
const BASE_URL = "https://api.themoviedb.org/3";

export const getNowPlayingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language: "es-ES",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return [];
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: "es-ES",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return [];
  }
};
