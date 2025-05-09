import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const FetchLatestMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: {
            api_key: API_KEY,
            language: 'en-US',
            page: 1,
        },
    });
    return res.data.results.slice(0, 5);
}

export const fetchMovieById = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: API_KEY,
      append_to_response: "credits",
    },
  });
  return response.data;
};

export const fetchCast = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.cast.slice(0, 10);
};

export const fetchTrailer = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );
};

export const fetchRecommended = async (id) => {
  const response = await axios.get(`${BASE_URL}/movie/${id}/recommendations`, {
    params: {
      api_key: API_KEY,
    },
  });
  return response.data.results.slice(0, 3);
};

export const fetchActorDetails = async (id) => {
  const res = await axios.get(`${BASE_URL}/person/${id}`, {
    params: { api_key: API_KEY },
  });
  return res.data;
};

export const fetchActorCredits = async (id) => {
  const res = await axios.get(`${BASE_URL}/person/${id}/movie_credits`, {
    params: { api_key: API_KEY },
  });
  return res.data.cast;
};

export const fetchPopularActors = async () => {
  const res = await axios.get(`${BASE_URL}/person/popular`, {
    params: { api_key: API_KEY },
  });
  return res.data.results;
};

export const searchMovies = async (query) => {
  const res = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });
  return res.data.results;
};

export const fetchGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  });
  return response.data.genres;
};

export const fetchMoviesByGenre = async (genreId, page = 1, sortBy = "popularity.desc") => {
  const [genreRes, moviesRes] = await Promise.all([
    axios.get(`${BASE_URL}/genre/movie/list`, { params: { api_key: API_KEY } }),
    axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        with_genres: genreId,
        sort_by: sortBy,
        page,
      },
    }),
  ]);

  const genre = genreRes.data.genres.find((g) => g.id.toString() === genreId.toString());

  return {
    name: genre?.name || "Genre",
    results: moviesRes.data.results,
    totalPages: moviesRes.data.total_pages,
  };
};

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/day`, {
    params: {
      api_key: API_KEY,
    },
  });
  return res.data.results;
};

export const fetchTopRatedMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/top_rated`, {
    params: {
      api_key: API_KEY,
    },
  });
  return res.data.results;
};

export const fetchUpcomingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/upcoming`, {
    params: {
      api_key: API_KEY,
    },
  });
  return res.data.results;
};