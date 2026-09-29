import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { getMovieDetails } from "../services/movieApi";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadMovie() {
    setLoading(true);
    setError("");

    try {
      const data = await getMovieDetails(id);
      setMovie(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMovie();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="page details-page">
        <ErrorMessage message={error} onRetry={loadMovie} />
      </div>
    );
  }

  const poster =
    movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : "https://placehold.co/500x750?text=No+Poster";

  return (
    <div className="page details-page">
      <Link to="/" className="back-link">← Back to Movies</Link>

      <section className="details-card">
        <div className="details-poster">
          <img src={poster} alt={`${movie.Title} poster`} />
        </div>

        <div className="details-content">
          <span className="eyebrow">{movie.Type?.toUpperCase()}</span>
          <h1>{movie.Title}</h1>

          <div className="rating-box">
            <strong>⭐ {movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"}</strong>
            <span>IMDb Rating</span>
          </div>

          <div className="info-row">
            <span>{movie.Year}</span>
            <span>{movie.Runtime}</span>
            <span>{movie.Rated}</span>
          </div>

          <p className="genre">{movie.Genre}</p>

          <p className="plot">{movie.Plot}</p>

          <div className="detail-list">
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Cast:</strong> {movie.Actors}</p>
            <p><strong>Writer:</strong> {movie.Writer}</p>
            <p><strong>Language:</strong> {movie.Language}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
          </div>

          {movie.Ratings?.length > 0 && (
            <div className="ratings-section">
              <h3>Ratings</h3>
              {movie.Ratings.map((rating) => (
                <div className="rating-line" key={rating.Source}>
                  <span>{rating.Source}</span>
                  <strong>{rating.Value}</strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default MovieDetails;