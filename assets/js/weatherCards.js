/** 
setWeatherCards:
1) Obtains the values from periodsOfTheDayAverages by object desturcturing
2) Query selects the image src of the appropriate data-card attribute
3) modifys the src element with the appropriate values from periodsOfTheDayAverages
**/
export function setWeatherCards(periodsOfTheDayAverages) {
  let {
    stillNightAverages,
    morningAverages,
    afternoonAverages,
    eveningAverages,
    nightAverages,
  } = periodsOfTheDayAverages;

  document.querySelector(
    "[data-still-night-card] .weather-icon"
  ).src = `assets/images/weather-icons/${stillNightAverages.weatherType}.png`;
  document.querySelector(
    "[data-morning-card] .weather-icon"
  ).src = `assets/images/weather-icons/${morningAverages.weatherType}.png`;
  document.querySelector(
    "[data-afternoon-card] .weather-icon"
  ).src = `assets/images/weather-icons/${afternoonAverages.weatherType}.png`;
  document.querySelector(
    "[data-evening-card] .weather-icon"
  ).src = `assets/images/weather-icons/${eveningAverages.weatherType}.png`;
  document.querySelector(
    "[data-night-card] .weather-icon"
  ).src = `assets/images/weather-icons/${nightAverages.weatherType}.png`;
}
