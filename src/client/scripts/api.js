import axios from "axios";

const fetchCityLocation = async (city) => {
  try {
    const response = await axios.post("http://localhost:8000/getCityLocation", {
      city,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching city location:", error);
  }
};

const fetchCityWeather = async (lat, lng, daysUntilTrip) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getCityWeather", {
      lat,
      lng,
      daysUntilTrip,
    });
    return data;
  } catch (error) {
    console.error("Error fetching city weather:", error);
  }
};

const fetchCityPicture = async (city_name) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getCityPicture", {
      city_name,
    });
    return data.cityPicture;
  } catch (error) {
    console.error("Error fetching city picture:", error);
  }
};

export { fetchCityLocation, fetchCityWeather, fetchCityPicture };
