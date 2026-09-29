import React from "react";
import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://placehold.co/400x600?text=No+Poster";

  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <img src={poster} alt={`${movie.Title} poster`} />
      <div className="movie-card-content">
        <h3>{movie.Title}</h3>
        <div className="movie-meta">
          <span>{movie.Year}</span>
          <span>⭐ {movie.imdbRating && movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"}</span>
        </div>
        <span className="details-link">View Details →</span>
      </div>
    </Link>
  );
}

export default MovieCard;