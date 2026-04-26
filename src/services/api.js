const API_BASE_URL = '/api';

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export const getPopularMovies = async () => {
  return request('/movies');
};

export const searchMovies = async (query) => {
  return request(`/movies/search?q=${encodeURIComponent(query)}`);
};
