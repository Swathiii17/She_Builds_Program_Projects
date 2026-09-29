import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page not-found">
      <h1>404</h1>
      <h2>Movie page not found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="primary-link">Go Home</Link>
    </div>
  );
}

export default NotFound;