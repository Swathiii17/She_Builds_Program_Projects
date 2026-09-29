const API_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

async function request(params) {
  if (!API_KEY) {
    throw new Error(
      "OMDb API key is missing. Create a .env file and add VITE_OMDB_API_KEY."
    );
  }

  const query = new URLSearchParams({
    apikey: API_KEY,
    ...params,
  });

  const response = await fetch(`${API_URL}?${query}`);

  if (!response.ok) {
    throw new Error("Unable to connect to the movie service.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "No movies found.");
  }

  return data;
}

export async function searchMovies(query, type = "movie") {
  return request({
    s: query,
    type,
    page: "1",
  });
}

export async function getMovieDetails(imdbId) {
  return request({
    i: imdbId,
    plot: "full",
  });
}

export async function getMoviesByCategory(category) {
  // OMDb does not provide a genre-only endpoint.
  // These curated searches demonstrate category filtering
  // while keeping the application simple for an assignment.
  const searches = {
    All: "star",
    Action: "war",
    Comedy: "love",
    Drama: "life",
    Horror: "night",
    SciFi: "space",
    Animation: "toy",
  };

  return searchMovies(searches[category] || searches.All);
}