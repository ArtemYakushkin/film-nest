// import axios from 'axios';

export const fetchMovieNews = async () => {
  try {
    const response = await fetch("/.netlify/functions/getMovieNews");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при загрузке новостей о кино:", error);
    return [];
  }
};