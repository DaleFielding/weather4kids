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
      } = data
      // Destruct data needed from the current + location object. Will be considering a better way to obtain this information.
      let {
        condition: weatherType,
        feelslike_c: feelsLike,
        precip_mm: precip,
        temp_c: temp,
        wind_mph: wind,
        humidity,
        uv,
      } = current;

      let {
        lat,
        lon,
        country,
        name,
        tz_id: timezone,
        localtime,
      } = location;

      console.log(data);
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
        console.log(locationName)
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