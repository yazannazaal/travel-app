const inputValidation = () => {
  let isValid = true;

  const requiredCity = document.querySelector("#requiredCity");
  const requiredDate = document.querySelector("#requiredDate");
  const cityId = document.getElementById("cityId");
  const dateId = document.getElementById("dateId");

  if (!cityId.value.trim()) {
    requiredCity.textContent =
      "This field is required, please enter a city name.";
    requiredCity.style.color = "red";
    isValid = false;
  } else {
    requiredCity.textContent = "";
  }

  const today = new Date().toISOString().split("T")[0];
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
    requiredDate.textContent = "";
  }

  return isValid;
};

export { inputValidation };
