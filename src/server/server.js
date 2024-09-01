const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { getCityLocation } = require("./getCityLocation");
const { getcityWeather } = require("./getcityWeather");
const { getCityPicture } = require("./getCityPicture");
const app = express();

dotenv.config();

app.use(express.json());
app.use(express.static("dist"));
app.use(cors());

const port = 8000;

app.get("/", (req, res) => {
  res.render("index.html");
});

const username = process.env.GEONAMES_USERNAME;
const weatherKey = process.env.WEATHER_APP_KEY;
const pixabayKey = process.env.PIXABAY_KEY;
app.post("/getCityLocation", async (req, res) => {
  const city = req.body.city;
  try {
    const cityLocation = await getCityLocation(city, username);
    res.send(cityLocation);
  } catch (error) {
    console.log("error while getting the location");
  }
});

app.post("/getCityWeather", async (req, res) => {
  const { lat, lng, daysUntilTrip } = req.body;
  try {
    const city_weather = await getcityWeather(
      lat,
      lng,
      daysUntilTrip,
      weatherKey
    );
    res.send(city_weather);
  } catch (error) {
    console.log("error while getting the weather");
  }
});

app.post("/getCityPicture", async (req, res) => {
  const { city_name } = req.body;
  try {
    const cityPicture = await getCityPicture(city_name, pixabayKey);
    res.send(cityPicture);
  } catch (error) {
    console.log("error while getting the picture");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
