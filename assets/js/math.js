/**
convertSecondsToHourly function:
Converts seconds to hourly, displayed as an integer
 **/
export function convertSecondsToHourly(seconds) {
  const hours = Math.floor(seconds / 3600) % 24;
  return hours;
}

// Object created in order to group the icon codes from the weather api
const iconCodesGrouped = {
  cloudy: [1006, 1009, 1030, 1135, 1147],
  "cloudy-but-sunny": [1003, 1066, 1249],
  rainy: [
    1063, 1069, 1072, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192,
    1195, 1198, 1201, 1204, 1207, 1240, 1243, 1246, 1249, 1252,
  ],
  snowy: [
    1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1255, 1258, 1261,
    1264,
  ],
  stormy: [1087, 1273, 1276, 1279, 1282],
  sunny: [1000],
};
/**
   calculateMostCommonAndRandom function:
  1) Work out which weather type has the most matches
  2) Then filter into mostCommonTypes
  3) Return an array with mostCommonTypes and randomType; this is in case there isnt a single most common type.
**/
function calculateMostCommon(weatherTypeCount) {
  let maxCount = Math.max(...Object.values(weatherTypeCount));
  let mostCommonTypes = Object.keys(weatherTypeCount).filter(
    (type) => weatherTypeCount[type] === maxCount
  );
  let randomIndex = Math.floor(Math.random() * mostCommonTypes.length);
  let randomType = mostCommonTypes[randomIndex];

  return { mostCommonTypes, randomType };
}

/**
calculateAverages function:
1) Checks if the array passed as a parameter is empty and return an empty object if so
2) Extracts keys from the first object in the array
3) Puts all the values of the 'weatherCode' key into an array
4) Loop through each key using for.Each:
  4a) If the key is not 'weatherCode' or 'condition', calculate an average of the values
       and store in arrayAveraged.
  4b) If the key is 'weatherCode' or 'condition', store all 'weatherCode' values as an array in arrayAveraged
    - Calculate the most commom weather types using the iconCodesGrouped object.
    - Randomly select one if there is not a most common type
  5) Return the averaged array
 **/
export function calculateAverages(array) {
  if (array.length === 0) {
    return {};
  }

  let keys = Object.keys(array[0]);
  let weatherCodeArray = array.map(function (value) {
    return value.weatherCode;
  });
  let arrayAveraged = {};

  keys.forEach(function (key) {
    if (key !== "weatherCode" && key !== "condition") {
      let arrayReduced = array.reduce(function (acc, curr) {
        return acc + curr[key];
      }, 0);
      arrayAveraged[key] = Math.round(arrayReduced / array.length);
    } else if (key === "weatherCode" || key === "condition") {
      arrayAveraged[key] = weatherCodeArray;

      let weatherTypeCount = {};
      weatherCodeArray.forEach(function (code) {
        for (let type in iconCodesGrouped) {
          if (iconCodesGrouped[type].includes(code)) {
            weatherTypeCount[type] = (weatherTypeCount[type] || 0) + 1;
          }
        }
      });

      let mostCommonAndRandom = calculateMostCommon(weatherTypeCount);
      let mostCommonWeatherTypes = mostCommonAndRandom.mostCommonTypes;
      let randomMostCommonWeatherType = mostCommonAndRandom.randomType;

      arrayAveraged["weatherType"] =
        mostCommonWeatherTypes.length === 1
          ? mostCommonWeatherTypes[0]
          : randomMostCommonWeatherType;
    }
  });

  return arrayAveraged;
}
