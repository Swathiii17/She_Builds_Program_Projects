import React from "react";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import MovieGrid from "../components/MovieGrid";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { searchMovies, getMoviesByCategory } from "../services/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastSearch, setLastSearch] = useState("");

  async function loadCategory(category) {
    setLoading(true);
    setError("");

    try {
      const data = await getMoviesByCategory(category);
      setMovies(data.Search || []);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleSearch(query) {
    setLoading(true);
    setError("");
    setLastSearch(query);
    setSelectedCategory("All");

    try {
      const data = await searchMovies(query);
      setMovies(data.Search || []);
    } catch (err) {
      setError(err.message);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
    setLastSearch("");
    loadCategory(category);
  }

  useEffect(() => {
    loadCategory("All");
  }, []);

  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR CINEMA COMPANION</span>
          <h1>Discover your next <span>favourite movie.</span></h1>
          <p>
            Search thousands of movies, explore categories, and check ratings
            and detailed information.
          </p>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">EXPLORE</span>
            <h2>{lastSearch ? `Results for "${lastSearch}"` : "Browse Movies"}</h2>
          </div>
        </div>

        <CategoryFilter
          selected={selectedCategory}
          onChange={handleCategoryChange}
        />

        {loading && <Loading />}

        {!loading && error && (
          <ErrorMessage
            message={error}
            onRetry={() =>
              lastSearch
                ? handleSearch(lastSearch)
                : loadCategory(selectedCategory)
            }
          />
        )}

        {!loading && !error && <MovieGrid movies={movies} />}
      </section>
    </div>
  );
}

export default Home;