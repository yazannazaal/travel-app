const axios = require("axios");
const { getCityLocation } = require("../../server/getCityLocation");

// Mock the axios module
jest.mock("axios");

describe("getCityLocation", () => {
  it("should return city location data when the city is found", async () => {
    const mockResponse = {
      data: {
        geonames: [
          {
            name: "New York",
            lat: "40.7128",
            lng: "-74.0060",
          },
        ],
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    const username = "testusername";
    const city = "New York";
    const result = await getCityLocation(city, username);

    expect(result).toEqual({
      name: "New York",
      lat: "40.7128",
      lng: "-74.0060",
    });
    expect(axios.get).toHaveBeenCalledWith(
      `https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`
    );
  });

  it("should return an error message when no city is found", async () => {
    const mockResponse = {
      data: {
        geonames: [],
      },
    };
    axios.get.mockResolvedValue(mockResponse);

    const username = "testusername";
    const city = "Nonexistent City";
    const result = await getCityLocation(city, username);

    expect(result).toEqual({
      message:
        "City not found. Please check your spelling or try another city.",
      errorStatus: true,
    });
  });

  it("should handle errors from the axios request", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    const username = "testusername";
    const city = "New York";
    const result = await getCityLocation(city, username);

    expect(result).toBeUndefined();
  });
});
