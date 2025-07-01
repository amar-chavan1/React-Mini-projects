import React, { useState } from "react";
import {
  TextField,
  Button,
  Alert,
  Stack,
  IconButton,
  Box,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function SearchBox({ updateWeatherData }) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const theme = useTheme();

  const API_KEY = "8cc26fbe5ba037fcb98f4f709ac7f135";

  const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const { main, weather } = data;

    return {
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name.");
      setSuccess("");
      return;
    }

    try {
      const weatherData = await getWeather(city);
      updateWeatherData(weatherData);
      setSuccess(`Weather fetched for ${weatherData.city}, ${weatherData.country}`);
      setError("");
      setCity("");
    } catch (err) {
      setError("City not found. Try another one.");
      setSuccess("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: theme.palette.mode === "dark" ? "#2c2c2c" : "#f9f9f9",
        boxShadow: 3,
        mt: 2,
      }}
    >
      <Stack spacing={2}>
        <TextField
          variant="outlined"
          label="Search City"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
        />

        <Button type="submit" variant="contained" fullWidth>
          Search
        </Button>

        {error && (
          <Alert
            severity="error"
            onClose={() => setError("")}
            sx={{ borderRadius: 2 }}
          >
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            onClose={() => setSuccess("")}
            sx={{ borderRadius: 2 }}
          >
            {success}
          </Alert>
        )}
      </Stack>
    </Box>
  );
}
