
import React from "react";
import "./App.css";

const WeatherError = ({ message }) => {
  return (
    <div className="weather-error">
      <img src="/icons/error.png" alt="Error" className="weather-error-img" />
      <h2>Something went wrong</h2>
      <p>{message}</p>
    </div>
  );
};

export default WeatherError;
