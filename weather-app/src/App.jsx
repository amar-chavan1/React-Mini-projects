import { useState } from "react";
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import WeatherApp from "./WeatherApp";
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Tooltip title={darkMode ? "Enable Light Mode" : "Enable Dark Mode"}>
          <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
            {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>
      </Box>

      <WeatherApp />
    </ThemeProvider>
  );
}
