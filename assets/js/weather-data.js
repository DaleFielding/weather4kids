import { convertSecondsToHourly, calculateAverages } from "./math.js";
import { setWeatherCards } from "./weather-cards.js";
// const fetch = require('node-fetch'); // commented out as this stops it working in browser console.
const baseUrl = "https://api.weatherapi.com/v1";
const apiKey = "211d38f5813f4f90bfa70515240501";
let locationName = "Bath";

// Export the below variable (which will be an object containing data) so that the its value can be accessed from other files without having to call getWeatherData again.
export let currentPeriodAveragesGlobal;
export let periodsOfTheDayAveragesGlobal;

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
      let { current, location, forecast } = data;

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
        localtime: localTime,
      } = location;

      let { hour, day } = forecast.forecastday[0];

      const hourlyWeatherArray = hour.map((entry) => ({
        timeHourly: convertSecondsToHourly(entry.time_epoch),
        tempHourly: entry.temp_c,
        feelsLikeHourly: entry.feelslike_c,
        precipHourly: entry.precip_in,
        humidityHourly: entry.humidity,
        windHourly: entry.wind_mph,
        condition: entry.condition,
        weatherCode: entry.condition.code,
      }));

      /* Slice hourlyWeatherArray into separate arrays for the different periods of the day. 
      The index of hourlyWeatherArray runs from 0-23 which represents each hour of the day; 0 = 12am, 1 = 1am etc. */
      const stillNight = hourlyWeatherArray.slice(0, 5);
      const morning = hourlyWeatherArray.slice(5, 12);
      const afternoon = hourlyWeatherArray.slice(12, 18);
      const evening = hourlyWeatherArray.slice(18, 22);
      const night = hourlyWeatherArray.slice(22, 24);

      const periodsOfTheDay = {
        stillNight,
        morning,
        afternoon,
        evening,
        night,
      };

      // Pass periods of the day to the calculate averages function and store the return value into variables
      let stillNightAverages = calculateAverages(periodsOfTheDay.stillNight);
      let morningAverages = calculateAverages(periodsOfTheDay.morning);
      let afternoonAverages = calculateAverages(periodsOfTheDay.afternoon);
      let eveningAverages = calculateAverages(periodsOfTheDay.evening);
      let nightAverages = calculateAverages(periodsOfTheDay.night);

      let periodsOfTheDayAverages = {
        stillNightAverages,
        morningAverages,
        afternoonAverages,
        eveningAverages,
        nightAverages,
      };

      let { currentPeriodAverages, currentPeriod } = calculateCurrentPeriod(
        localTime,
        stillNightAverages,
        morningAverages,
        afternoonAverages,
        eveningAverages,
        nightAverages
      );
      setIntroMsg(locationName, currentPeriodAverages, currentPeriod);
      setWeatherCards(periodsOfTheDayAverages);
      // console.log(
      //   "periodsOfTheDayAverages",
      //   periodsOfTheDayAverages.afternoonAverages.weatherType
      // );
      console.log("Current Period Averages", currentPeriodAverages);
      // console.log("All Data:", data);
      // console.log ("Hour:", hour);
      // console.log("Day:", day);
      // console.log("periods of the day:", periodsOfTheDay);
      // console.log("Map Hourly:", hourlyWeatherArray);
      // console.log("Periods Of The Day:", periodsOfTheDay);
      // console.log("Morning Averages:", morningAverages);
      // console.log("Afternoon Averages:", afternoonAverages);
      // console.log("Evening Averages:", eveningAverages);
      // console.log("Night Averages:", nightAverages);

      return (
        (currentPeriodAveragesGlobal = currentPeriodAverages),
        (periodsOfTheDayAveragesGlobal = periodsOfTheDayAverages)
      );
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

/** 
- Determine current time based on the location, 
- Calculate current time period of the day based on this 
- Then create a new object containing info from the appropriate object (morningAverages etc; see above)
- return the object to be accessed outside of the function.
**/
function calculateCurrentPeriod(
  localTime,
  stillNightAverages,
  morningAverages,
  afternoonAverages,
  eveningAverages,
  nightAverages
) {
  let currentPeriod;
  let currentPeriodAverages;

  let currentHour = new Date(localTime).getHours();
  if (currentHour >= 0 && currentHour < 5) {
    currentPeriod = "before morning...Why are you awake?";
    currentPeriodAverages = stillNightAverages;
  } else if (currentHour >= 5 && currentHour < 12) {
    currentPeriod = "morning";
    currentPeriodAverages = morningAverages;
  } else if (currentHour >= 12 && currentHour < 18) {
    currentPeriod = "afternoon";
    currentPeriodAverages = afternoonAverages;
  } else if (currentHour >= 18 && currentHour < 21) {
    currentPeriod = "evening";
    currentPeriodAverages = eveningAverages;
  } else if (currentHour >= 21 && currentHour < 24) {
    currentPeriod = "night";
    currentPeriodAverages = nightAverages;
  }
  return { currentPeriodAverages, currentPeriod };
}

/**
  setIntroMsg:
  - Pass the found location as a parameter, which indicates location access has been allowed. 
  - Pass the currentPeriodAverages object as the second parameter, allowing access to the weather data.
  - Update html for the intro message and display the desired data passed from the parameters.
  **/
function setIntroMsg(foundLocation, currentPeriodAverages, currentPeriod) {
  let mainIntro = document.querySelector("[data-main-intro]");
  mainIntro.innerHTML = `
  <main class="container-fluid text-center">
  <!-- Intro Message -->
  <div class="row justify-content-center align-items-center">
    <h2 class="intro-message col-12 col-sm-9 text-center data-main-intro">
      Good ${currentPeriod}! You are in ${foundLocation} and the temperature is currently around ${currentPeriodAverages.tempHourly}&degC.
    </h2>
  </div>
  <!-- /Intro Message -->
  `;
}

/**  
getLocation:
- Get the user location coordinates
- Fetch to reverse geocode in order to obtain the city/area from data.location.name 
- Update the locationName variable. 
- Call the setIntroMsg function passing in the found location as a parameter
- Catch any errors if unable to get location.
**/
function getLocation() {
  const successCallback = (position) => {
    const { latitude, longitude } = position.coords;

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
    )
      .then((response) => response.json())
      .then((data) => {
        locationName = data.location.name;
        // console.log(locationName)
        getWeatherData(locationName);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const errorCallback = (error) => {
    console.log(error);
  };
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}
getLocation();
