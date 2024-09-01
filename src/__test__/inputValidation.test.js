import { inputValidation } from "../client/scripts/validation";

describe("inputValidation", () => {
  beforeEach(() => {
    // Reset the DOM before each test
    document.body.innerHTML = `
      <div>
        <input type="text" id="cityId" />
        <p id="requiredCity"></p>
        <input type="date" id="dateId" />
        <p id="requiredDate"></p>
      </div>
    `;
  });

  test("should display an error when city input is empty", () => {
    // Set up the DOM elements
    const cityInput = document.getElementById("cityId");
    const requiredCity = document.getElementById("requiredCity");

    cityInput.value = ""; // Empty input

    const isValid = inputValidation();

    expect(isValid).toBe(false);
    expect(requiredCity.textContent).toBe(
      "This field is required, please enter a city name."
    );
  });

  test("should display an error when date input is empty", () => {
    // Set up the DOM elements
    const dateInput = document.getElementById("dateId");
    const requiredDate = document.getElementById("requiredDate");

    dateInput.value = ""; // Empty input

    const isValid = inputValidation();

    expect(isValid).toBe(false);
    expect(requiredDate.textContent).toBe(
      "This field is required, please select a date."
    );
  });

  test("should display an error when date input is in the past", () => {
    // Set up the DOM elements
    const dateInput = document.getElementById("dateId");
    const requiredDate = document.getElementById("requiredDate");
    const pastDate = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .split("T")[0];

    dateInput.value = pastDate; // Set past date

    const isValid = inputValidation();

    expect(isValid).toBe(false);
    expect(requiredDate.textContent).toBe(
      "The date cannot be in the past. Please choose a valid date."
    );
  });

  test("should not display errors when inputs are valid", () => {
    // Set up the DOM elements
    const cityInput = document.getElementById("cityId");
    const dateInput = document.getElementById("dateId");
    const requiredCity = document.getElementById("requiredCity");
    const requiredDate = document.getElementById("requiredDate");
    const today = new Date().toISOString().split("T")[0];

    cityInput.value = "New York"; // Valid city
    dateInput.value = today; // Valid date

    const isValid = inputValidation();

    expect(isValid).toBe(true);
    expect(requiredCity.textContent).toBe("");
    expect(requiredDate.textContent).toBe("");
  });
});
