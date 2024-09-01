const axios = require("axios");

const getCityPicture = async (city_name, key) => {
  const { data } = await axios.get(
    `https://pixabay.com/api/?key=${key}&q=${city_name}&image_type=photo`
  );
  // Use a default image URL if no hits are found
  const cityPicture =
    data.hits.length > 0
      ? data.hits[0].webformatURL
      : "https://via.placeholder.com/640x480?text=Image+Not+Found";

  return { cityPicture };
};

module.exports = { getCityPicture };
