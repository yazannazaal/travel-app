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
    weatherDescriptionElement.textContent = `Weather forecast: ${weatherData.description}`;
    temperatureElement.textContent = `Forecast: ${weatherData.temp}°C`;
    maxTemperatureElement.textContent = `Max Temp: ${weatherData.app_max_temp}°C`;
    minTemperatureElement.textContent = `Min Temp: ${weatherData.app_min_temp}°C`;
  } else {
    weatherDescriptionElement.textContent = `Weather is expected to be: ${weatherData.description}`;
    temperatureElement.textContent = `Temperature: ${weatherData.temp}°C`;
    maxTemperatureElement.textContent = "";
    minTemperatureElement.textContent = "";
  }

  cityImageElement.innerHTML = `<img src="${pixabayData}" alt="An image that describes the city nature" style="width:100%; height:auto;">`;

  // Show flight data section
  flightDataElement.style.display = "block";
};

export { displayTripDetails };
