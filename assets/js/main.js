// const fetch = require('node-fetch'); // commented out as this stops it working in browser console.
const baseUrl = "http://api.weatherapi.com/v1";
const apiKey = "211d38f5813f4f90bfa70515240501";
let locationName = "Bath";

/* Fetch the weather data, throw an error if there's an issue with the response, catch the error and display it in the console.
Console log data if the fetch is successful.
*/
function getWeatherData() {
  let url = `${baseUrl}/forecast.json?key=${apiKey}&q=${locationName}&days=1&current.json?key=${apiKey}&q=${locationName}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Destruct the data object
      let {
        current,
        location,
        forecast
      } = data;

      // Extract data using a loop
      let currentData = {};
      for (let key in current) {
        currentData[key] = current[key];
      }

      let locationData = {};
      for (let key in location) {
        locationData[key] = location[key];
      }

      // Access the values as needed
      let weatherType = currentData.condition;
      let feelsLike = currentData.feelslike_c;
      let precip = currentData.precip_mm;
      let temp = currentData.temp_c;
      let wind = currentData.wind_mph;
      let humidity = currentData.humidity;
      let uv = currentData.uv;

      let lat = locationData.lat;
      let lon = locationData.lon;
      let country = locationData.country;
      let name = locationData.name;
      let timezone = locationData.tz_id;
      let localtime = locationData.localtime;

      // console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/* Get the user location coordinates, then fetch to reverse geocode in order to obtain the city/area from data.location.name and update the locationName variable. 
Catch any errors if unable to get location.
*/
function getLocation() {
  const successCallback = (position) => {
    const {
      latitude,
      longitude
    } = position.coords;

    fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`)
      .then((response) => response.json())
      .then((data) => {
        locationName = data.location.name;
        // console.log(locationName)
        getWeatherData(locationName);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  const errorCallback = (error) => {
    console.log(error);
  }
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
getLocation();