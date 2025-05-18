
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "Something went wrong";

  return (
    <div className="error-page">
      <img src="/icons/error.png" alt="Error" width="150" />
      <h1>Oops!</h1>
      <p>{message}</p>
      <button onClick={() => navigate("/")}>Back to Home</button>
    </div>
  );
};

export default ErrorPage;
