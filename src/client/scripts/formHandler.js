import axios from "axios";

const form = document.querySelector("form");
const requiredCity = document.querySelector("#requiredCity");
const requiredDate = document.querySelector("#requiredDate");
const cityId = document.getElementById("cityId");
const dateId = document.getElementById("dateId");

const formHandler = async (e) => {
  e.preventDefault();
  if (!inputValidation()) {
    return;
  }
  // Extract the form data
  const formData = new FormData(form);
  const city = formData.get("city");
  const date = formData.get("date");
  // Call fetchCityLocation with the city data
  const geonamesData = await fetchCityLocation(city);
  const { name, lat, lng } = geonamesData;
  const daysUntilTrip = calculateDaysUntilTrip(date);
  const weatherbitData = await fetchCityWeather(lat, lng, daysUntilTrip);
  const pixabayData = await fetchCityPicture(name);

  displayTripDetails(name, daysUntilTrip, weatherbitData, pixabayData);
};

const fetchCityLocation = async (city) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/getCityLocation",
      { city },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching city location:", error);
  }
};

const calculateDaysUntilTrip = (tripDate) => {
  const today = new Date(); // Current date
  const departureDate = new Date(tripDate); // User-entered date

  // Ensure the date is set to the start of the day (00:00:00)
  today.setHours(0, 0, 0, 0);
  departureDate.setHours(0, 0, 0, 0);

  // Calculate the difference in time (milliseconds)
  const timeDiff = departureDate - today;

  // Convert milliseconds to days
  const daysUntilTrip = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  // If the trip date is in the past, return 0
  return daysUntilTrip > 0 ? daysUntilTrip : 0;
};

const fetchCityWeather = async (lat, lng, daysUntilTrip) => {
  try {
    const { data } = await axios.post("http://localhost:8000/getCityWeather", {
      lat,
      lng,
      daysUntilTrip,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching city weather:", error);
  }
};
const fetchCityPicture = async (city_name) => {
  const { data } = await axios.post("http://localhost:8000/getCityPicture", {
    city_name,
  });
  const { cityPicture } = data;
  return cityPicture;
};

const displayTripDetails = (
  cityName,
  daysUntilTrip,
  weatherData,
  pixabayData
) => {
  // Get the elements from the DOM
  const remainingDaysElement = document.querySelector(".remaining-days");
  const cityNameElement = document.querySelector(".city-name");
  const weatherDescriptionElement = document.querySelector(
    ".weather-description"
  );
  const temperatureElement = document.querySelector(".temperature");
  const maxTemperatureElement = document.querySelector(".max-temperature");
  const minTemperatureElement = document.querySelector(".min-temperature");
  const cityImageElement = document.querySelector(".city-image");
  const flightDataElement = document.querySelector(".trip-details");

  // Update the DOM elements with the fetched data
  remainingDaysElement.textContent = `Your trip starts in ${daysUntilTrip} days from now`;
  cityNameElement.textContent = `Location: ${cityName}`;

  if (daysUntilTrip > 7) {
    // Display forecast information if daysUntilTrip > 7
    if (weatherData) {
      weatherDescriptionElement.textContent = `Weather forecast: ${weatherData.description}`;
      temperatureElement.textContent = `Forecast: ${weatherData.temp}°C`;
      maxTemperatureElement.textContent = `Max Temp: ${weatherData.app_max_temp}°C`;
      minTemperatureElement.textContent = `Min Temp: ${weatherData.app_min_temp}°C`;
    } else {
      weatherDescriptionElement.textContent = `Weather forecast: N/A`;
      temperatureElement.textContent = `Forecast: N/A`;
      maxTemperatureElement.textContent = `Max Temp: N/A`;
      minTemperatureElement.textContent = `Min Temp: N/A`;
    }
  } else {
    // Display current weather information if daysUntilTrip <= 7
    if (weatherData) {
      weatherDescriptionElement.textContent = `Weather is expected to be: ${weatherData.description}`;
      temperatureElement.textContent = `Temperature: ${weatherData.temp}°C`;
      maxTemperatureElement.textContent = "";
      minTemperatureElement.textContent = "";
    } else {
      weatherDescriptionElement.textContent = `Weather is expected to be: N/A`;
      temperatureElement.textContent = `Temperature: N/A`;
      maxTemperatureElement.textContent = "";
      minTemperatureElement.textContent = "";
    }
  }

  cityImageElement.innerHTML = `<img src="${pixabayData}" alt="An image that describes the city nature" style="width:100%; height:auto;">`;

  // Show flight data section
  flightDataElement.style.display = "block";
};

const inputValidation = () => {
  let isValid = true;

  // Validate city input
  if (!cityId.value.trim()) {
    requiredCity.textContent =
      "This field is required, please enter a city name.";
    requiredCity.style.color = "red";
    isValid = false;
  } else {
    requiredCity.textContent = ""; // Clear the message if input is valid
  }

  // Validate date input
  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  if (!dateId.value) {
    requiredDate.textContent = "This field is required, please select a date.";
    requiredDate.style.color = "red";
    isValid = false;
  } else if (dateId.value < today) {
    requiredDate.textContent =
      "The date cannot be in the past. Please choose a valid date.";
    requiredDate.style.color = "red";
    isValid = false;
  } else {
    requiredDate.textContent = ""; // Clear the message if input is valid
  }

  return isValid;
};
export { formHandler };
