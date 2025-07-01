import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  useTheme,
  Divider,
} from "@mui/material";

export default function DisplayBox({ data }) {
  const theme = useTheme();

  if (!data || !data.city) return null;

  const cardBg =
    theme.palette.mode === "dark"
      ? "linear-gradient(to right, #2c3e50, #1c1c1c)"
      : "linear-gradient(to right, #e0f7fa, #ffffff)";

  return (
    <Card
      sx={{
        mt: 4,
        borderRadius: 4,
        boxShadow: 5,
        background: cardBg,
        color: theme.palette.text.primary,
        p: 2,
      }}
    >
      <CardContent>
        {/* City & Country */}
        <Typography variant="h5" gutterBottom fontWeight="bold">
          📍 {data.city}, {data.country}
        </Typography>

        {/* Temperature Display */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Typography
            variant="h2"
            fontWeight="bold"
            color={theme.palette.mode === "dark" ? "#4fc3f7" : "#0288d1"}
          >
            {data.temp}°C
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {data.weather} — {data.description}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Weather Info */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography><strong>Feels Like:</strong> {data.feels_like}°C</Typography>
            <Typography><strong>Max Temp:</strong> {data.temp_max}°C</Typography>
            <Typography><strong>Min Temp:</strong> {data.temp_min}°C</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography><strong>Humidity:</strong> {data.humidity}%</Typography>
            <Typography><strong>Pressure:</strong> {data.pressure} hPa</Typography>
            <Typography>
              <strong>Sea / Ground:</strong>{" "}
              {data.sea_level ?? "N/A"} / {data.grnd_level ?? "N/A"} hPa
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
