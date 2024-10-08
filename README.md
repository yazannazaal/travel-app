# Travel Planner App

## Overview

The **Travel Planner App** is a project built from scratch to consolidate the skills I've learned in web development, focusing on JavaScript, HTML, CSS, and integrating multiple APIs in a dynamic web application. This app allows users to plan their trips by entering their travel destination and departure date, providing current or future weather forecasts and a relevant image of the location.

## Features

- **Form Input**: Users can enter a destination city and a departure date.
- **Weather Forecast**: Depending on the departure date, the app displays current or predicted weather using the **Weatherbit API**.
- **Location Coordinates**: Uses the **Geonames API** to convert city names to geographical coordinates required by the Weatherbit API.
- **Location Images**: Fetches an image of the destination city using the **Pixabay API**.
- **Countdown Timer**: Displays the number of days left until the trip.
- **Responsive Design**: Clean and modern user interface built with HTML, SCSS, and JavaScript.

## Technologies Used

- **JavaScript**: Core logic of the app, including API requests, data processing, and DOM manipulation.
- **HTML/CSS (SCSS)**: Structure and styling of the app.
- **Webpack**: Module bundler for compiling the app’s assets and managing dependencies.
- **Express Server**: Provides a backend environment for serving the app.
- **Service Workers**: Caching and offline functionality.

### APIs Used

- **Geonames API**: Retrieves geographic coordinates based on city names.
- **Weatherbit API**: Provides weather data for the specified coordinates.
- **Pixabay API**: Fetches images based on the entered location.

## Prerequisites

- **Node.js:** Version `v20.10.0`  
  Ensure you have Node.js version `v20.10.0` installed to avoid compatibility issues. You can use [nvm](https://github.com/nvm-sh/nvm) (Node Version Manager) to manage and switch between different Node.js versions:

  ```bash
  nvm install 20.10.0
  nvm use 20.10.0

  ```

## Installation and Setup

**Note**: This repository was built from scratch and does not contain any cloned code from previous projects.

1. **Navigate to the project directory:**

   ```bash
   cd travel-planner-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Build for production:**

   ```bash
   npm run build
   ```

5. **Start the Express server:**

   ```bash
   npm start
   ```

## Contributing

If you wish to contribute to this project, please fork the repository and submit a pull request with a detailed description of your changes.

## Acknowledgments

- Thanks to **Udacity** for providing the training and the project outline.
- APIs: **Geonames, Weatherbit, Pixabay**.
