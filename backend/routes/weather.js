// routes/weather.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.OPENWEATHER_API_KEY;

router.get('/data', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: "Enter City Please" });
    }

    try {
        const weather_data = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        const weatherData = weather_data.data;

        res.json({
            success: true,
            message: "Weather data fetched successfully",
            data: {
                city: weatherData.name,
                temperature: weatherData.main.temp,
                humidity: weatherData.main.humidity,
                description: weatherData.weather[0].description,
                windSpeed: weatherData.wind.speed
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

module.exports = router;
