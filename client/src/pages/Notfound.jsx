import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notFoundPage">
      <h1>404</h1>
      <p style={{ color: 'var(--muted)', fontSize: 16 }}>Page not found</p>
      <button
        className="notFoundPage__btn"
        onClick={() => navigate("/login")}
      >
        Go to Login
      </button>
    </div>
  );
}

export default NotFound;