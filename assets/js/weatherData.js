import { calculateAverages } from './math.js';

// const fetch = require('node-fetch'); // commented out as this stops it working in browser console.
const baseUrl = "http://api.weatherapi.com/v1";
const apiKey = "211d38f5813f4f90bfa70515240501";
let locationName = "Bath"; 

/* getWeatherData() function:
- Fetch the weather data
- destructure data into variables if fetch succesfull
- throw an error if there's an issue with the response 
- catch the error and display it in the console
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
      let {
        current,
        location,
        forecast
      } = data;

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
        lat: latitude,
        lon: longitude,
        country,
        name,
        tz_id: timezone,
        localtime,
      } = location;

      let {hour, day}= forecast.forecastday[0];

      const hourlyWeatherArray = hour.map(entry => ({
        timeHourly: entry.time_epoch,
        tempHourly: entry.temp_c,
        feelsLikeHourly: entry.feelslike_c,
        precipHourly: entry.precip_in,
        humidityHourly: entry.humidity,
        windHourly: entry.wind_mph
      }));
      
      /* Slice hourlyWeatherArray into separate arrays for the different periods of the day. 
      The index of hourlyWeatherArray runs from 0-23 which represents each hour of the day; 0 = 1am, 1 = 2am etc.
      I have purposely left out indexes 0-4 as before morning will not be included within the site. */ 
      const morning = hourlyWeatherArray.slice(5, 12);
      const afternoon = hourlyWeatherArray.slice(12, 18);
      const evening = hourlyWeatherArray.slice(18, 22);
      const night = hourlyWeatherArray.slice(21, 25);
      
      const periodsOfTheDay = {
        morning,
        afternoon,
        evening,
        night
      };

      // Pass periods of the day to the calculate averages function and store the return value into variables
      const morningAverages = calculateAverages(periodsOfTheDay.morning);
      const afternoonAverages = calculateAverages(periodsOfTheDay.afternoon);
      const eveningAverages = calculateAverages(periodsOfTheDay.evening);
      const nightAverages = calculateAverages(periodsOfTheDay.night);

      // console.log("All Data:", data);
      // console.log ("Hour:", hour);
      // console.log("Day:", day);
      // console.log("Map Hourly:", hourlyWeatherArray);
      // console.log("Periods Of The Day:", periodsOfTheDay);
      console.log("Morning Averages:", morningAverages);
      console.log("Afternoon Averages:", afternoonAverages);
      console.log("Evening Averages:", eveningAverages);
      console.log("Night Averages:", nightAverages);
      
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