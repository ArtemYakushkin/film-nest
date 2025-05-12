import axios from 'axios';

export const fetchMovieNews = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: 'movie',
        apiKey: process.env.REACT_APP_NEWS_API_KEY,
        language: 'en',
        sortBy: 'publishedAt',
      },
    });
    return response.data.articles;
  } catch (error) {
    console.error('Ошибка при загрузке новостей о кино:', error);
    return [];
  }
};