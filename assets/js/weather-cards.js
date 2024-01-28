/**
setWeatherCards:
1) Obtains the values from periodsOfTheDayAverages by object destructuring.
2) Query selects the image src of the appropriate data-card attribute.
3) modifys the src element with the appropriate values from periodsOfTheDayAverages.
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
    "[data-card='still-night-card'] .weather-icon"
  ).src = `assets/images/weather-icons/${stillNightAverages.weatherType}.png`;
  document.querySelector(
    "[data-card='morning-card'] .weather-icon"
  ).src = `assets/images/weather-icons/${morningAverages.weatherType}.png`;
  document.querySelector(
    "[data-card='afternoon-card'] .weather-icon"
  ).src = `assets/images/weather-icons/${afternoonAverages.weatherType}.png`;
  document.querySelector(
    "[data-card='evening-card'] .weather-icon"
  ).src = `assets/images/weather-icons/${eveningAverages.weatherType}.png`;
  document.querySelector(
    "[data-card='night-card'] .weather-icon"
  ).src = `assets/images/weather-icons/${nightAverages.weatherType}.png`;
}
