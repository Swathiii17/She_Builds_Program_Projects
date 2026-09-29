import React from "react";
import MovieCard from "./MovieCard";

function MovieGrid({ movies }) {
  if (!movies?.length) {
    return <p className="empty-state">No movies to display.</p>;
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;