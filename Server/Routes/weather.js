const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/:city", async (req, res) => {
  const city = req.params.city;
  const apiKey = process.env.WEATHER_API_KEY; // Fix here

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    if (error.response) {
      console.error("Weather API Response:", error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  }
});

module.exports = router;
