const axios = require("axios");

const getCityLocation = async (city, username) => {
  try {
    const { data } = await axios.get(
      `https://secure.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`
    );
    if (!data.geonames.length) {
      const errorMsg = {
        message:
          "City not found. Please check your spelling or try another city.",
        errorStatus: true,
      };
      return errorMsg;
    }
    const { name, lat, lng } = await data.geonames[0];
    return { name, lat, lng };
  } catch (error) {
    console.error("Error fetching city location:");
  }
};

module.exports = { getCityLocation };
