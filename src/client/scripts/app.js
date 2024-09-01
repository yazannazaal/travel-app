import { fetchCityLocation, fetchCityWeather, fetchCityPicture } from "./api";
import { calculateDaysUntilTrip } from "./helpers";
import { displayTripDetails } from "./display";
import { inputValidation } from "./validation";

const formHandler = async (e) => {
  e.preventDefault();
  if (!inputValidation()) {
    return;
  }
  // Extract the form data
  const formData = new FormData(e.target);
  const city = formData.get("city");
  const date = formData.get("date");

  // Call fetchCityLocation with the city data
  const geonamesData = await fetchCityLocation(city);
  if (geonamesData.errorStatus) {
    document.querySelector("#requiredCity").textContent = geonamesData.message;
    document.querySelector("#requiredCity").style.color = "red";
    return;
  }

  const { name, lat, lng } = geonamesData;
  const daysUntilTrip = calculateDaysUntilTrip(date);
  const weatherbitData = await fetchCityWeather(lat, lng, daysUntilTrip);
  const pixabayData = await fetchCityPicture(name);

  displayTripDetails(name, daysUntilTrip, weatherbitData, pixabayData);
};

export { formHandler };
