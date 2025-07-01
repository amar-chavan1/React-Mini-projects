import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import DisplayBox from "./DisplayBox";
import { Container, Typography } from "@mui/material";
const API_KEY = import.meta.env.VITE_API_KEY;

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);

  const updateWeatherData = (data) => {
    setWeatherData({ ...data });
  };

  // Function to fetch weather using coordinates
  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.name) throw new Error("Invalid response");

      const { main, weather } = data;

      const formatted = {
        city: data.name,
        country: data.sys.country,
        feels_like: main.feels_like,
        grnd_level: main.grnd_level,
        humidity: main.humidity,
        pressure: main.pressure,
        sea_level: main.sea_level,
        temp: main.temp,
        temp_max: main.temp_max,
        temp_min: main.temp_min,
        weather: weather[0].main,
        description: weather[0].description,
      };

      setWeatherData(formatted);
    } catch (err) {
      console.error("❌ Failed to fetch weather by location:", err.message);
    }
  };

  // Auto-detect location on mount
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log("📍 Location:", latitude, longitude);
        fetchWeatherByCoords(latitude, longitude);
      },
      (err) => {
        console.error("📍 Location error:", err.message);
        // Fallback to Pune
        fetchWeatherByCoords(18.5204, 73.8567);
      },
      {
        enableHighAccuracy: true, // important for best accuracy
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        🌤 Weather App
      </Typography>

      <SearchBox updateWeatherData={updateWeatherData} />

      {weatherData && <DisplayBox data={weatherData} />}
    </Container>
  );
}
