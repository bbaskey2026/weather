
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./App.css";

  const Weather = () => {
  const [city, setCity] = useState("Sambalpur");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/weather/data?city=${city}`
      );
      const result = await response.json();

      if (response.ok && result.success) {
        setWeather(result.data);
        setError("");
      } else {
        setWeather(null);
        setError(result.error || "City not Found");
        navigate("/error", { state: { message: result.error || "City not Found" } }); 
      }
    } catch (err) {
      setError("Failed to fetch weather data");
      setWeather(null);
      navigate("/error", { state: { message: "Failed to fetch weather data" } }); 
    }
  };

const getWeatherIconByTemp = (temp) => {
    if (temp >= 35) return "/icons/hot.png";
    if (temp >= 25) return "/icons/sunny.png";
    if (temp >= 15) return "/icons/clouds.png";
    if (temp >= 5) return "/icons/cold.png";
    return "/icons/snow.png";
  };
  const getHum = (hum) => {
    if (hum >= 35) return "/hum/humidity.png";
    if (hum >= 25) return "/hum/smart.png";
    if (hum >= 15) return "/hum/weather.png";
    if (hum >= 5) return "/hum/fu.png";
    return "/icons/fuck.png";
  };

  const getCityImage = (cityName) => {
    const lower = cityName.toLowerCase();
    const cityImages = {
      sambalpur: "/cities/sambalpur.jpg",
      delhi: "/cities/delhi.jpg",
      london: "/cities/london.jpg",
      paris: "/cities/paris.jpg",
      tokyo: "/cities/tokyo.jpg",
      newyork: "/cities/newyork.jpg",
      mumbai: "/cities/mumbai.jpg",
      sydney: "/cities/sydney.jpg",
      dubai: "/cities/dubai.jpg",
      singapore: "/cities/singapore.jpg",
      beijing: "/cities/beijing.jpg",
    };
    return cityImages[lower] || "/cities/default.jpg";
  };

  return (
    <div className="weather-app">
      <body>
  <h1 class="logo-title">Weather Dashboard</h1>
</body>
-

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter")
            fetchWeather();
            else if (e.key === "ArrowUp") {
              setCity("");
              setWeather(null);
              setError("");
              setErrorImage(null);
            }
          }}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <WeatherError message={error} />}


{weather && (
  <div className="bento-grid">
    <div
      className="bento-card large"
      style={{ backgroundImage: `url(${getCityImage(weather.city)})` }}
    >
      <h2>{weather.city}</h2>
    </div>

    <div className="bento-card">
      <h3>Temperature</h3>
      <p className="big">{weather.temperature}°C</p>
    </div>

    <div className="bento-card">
      <h3>Wind</h3>
      <p>{weather.windSpeed} m/s</p>
    </div>

    <div className="bento-card">
      <h3>Humidity</h3>
      <img
          src={getHum(weather.humidity)}
          alt="Weather icon"
          className="weather-icon"
        />
      <p>{weather.humidity}%</p>
    </div>

    <div className="bento-card icon-card">
      
      <div className="icon-wrapper">
        <img
          src={getWeatherIconByTemp(weather.temperature)}
          alt="Weather icon"
          className="weather-icon"
        />
      </div>
    </div>

    <div className="bento-card dark">
      <h3>We Build Weather UX</h3>
      <p>Crafting real-time weather in a modern Bento layout.</p>
    </div>
  </div>
)}

      
    </div>
  );
};
  

export default Weather;







