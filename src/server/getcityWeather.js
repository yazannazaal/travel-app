const axios = require("axios");

const getcityWeather = async (lat, lng, daysUntilTrip, key) => {
  if (daysUntilTrip > 0 && daysUntilTrip <= 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&units=M&key=${key}`
    );
    const { weather, temp } = data.data[data.data.length - 1];
    const { description } = weather;
    const city_weather_data = { description, temp };
    return city_weather_data;
  } else if (daysUntilTrip > 7) {
    const { data } = await axios.get(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&units=M&days=${daysUntilTrip}&key=${key}`
    );
    const { weather, temp, app_max_temp, app_min_temp } =
      data.data[data.data.length - 1];
    const { description } = weather;
    const city_weather_data = { temp, app_max_temp, app_min_temp, description };
    return city_weather_data;
  }
};

module.exports = { getcityWeather };
