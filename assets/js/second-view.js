import {
  currentPeriodAveragesGlobal,
  periodsOfTheDayAveragesGlobal,
} from "./weather-data.js";
import { getChosenSnippet } from "./snippet.js";

/*
setWeatherDetails:
1) Takes averagedWeatherDetails as a parameter
2) Accesses the data attributes of the weatherDetails section and the soundText section then stores as a variable to be used with JS
3) Changes the inner HTML of weather details 
   3a) A list is created for specific weather details
   3b) Dynamic values are taken from averagedWeatherDetails to be displayed in the lists.
3) Changes the inner HTML of soundText adding dynamic value for the weatherType
*/
function setWeatherDetails(averagedWeatherDetails) {
  let weatherDetails = document.querySelector("[data-weather-details]");
  let soundText = document.querySelector("[data-sound-text]");
  let weatherType = averagedWeatherDetails.weatherType;
  weatherDetails.innerHTML = `
    <ul>
      <li>Wind = ${averagedWeatherDetails.windHourly}</li>
      <li>Precipitation = ${averagedWeatherDetails.precipHourly}</li>
      <li>Feels like = ${averagedWeatherDetails.feelsLikeHourly}</li>
      <li>Humidity = ${averagedWeatherDetails.humidityHourly}</li>
    </ul> 
  `;
  soundText.innerHTML = `Click icon above to hear sounds of when it is ${weatherType}`;
  console.log(averagedWeatherDetails);
}

let sound = new Audio();
/** 
playSound function:
1) Checks if sound is playing and if so pauses the sound then resets current time.
2) If sound is not playing it will execute a switch statement to determine the appropriate sound to be assigned
3) It will then play sound.
 **/
function playSound(weatherType) {
  if (!sound.paused) {
    sound.pause();
    sound.currentTime = 0;
  } else {
    console.log(weatherType);
    switch (weatherType) {
      case "rainy":
        sound.src = "assets/audio/heavy-rain.mp3";
        break;
      case "sunny":
        sound.src = "assets/audio/birds-chirping.mp3";
        break;
      case "cloudy-but-sunny":
        sound.src = "assets/audio/birds-chirping.mp3";
        break;
      case "cloudy":
        sound.src = "assets/audio/birds-chirping.mp3";
        break;
      case "stormy":
        sound.src = "assets/audio/thunder.mp3";
        break;
      case "snowy":
        sound.src = "assets/audio/thunder.mp3";
        break;
      default:
        console.error(`Error; No sound has been assigned to ${weatherType}`);
        return;
    }
    sound.play();
  }
}

/*
This event listener:
1) Waits for DOM content to fully load before accessing the class and data attribute that are needed and storing them as variables
2) Defines a function changeContent that allows the inner html of the main section content to be changed 
3) Loops over each weather card to add click event listeners for each card
  3a) When executed the value of the data attribute is accessed and stored in the variable clickedCard
  3b) intended new content is declared under the variable secondView
  3c) switch statement checks which card was clicked and stores the correct weather details into a variable called averagedWeatherDetails.
4) changeContent function is called with secondView string passed in.
5) setWeatherDetails is called with averagedWeatherDetails passed in. 
*/
document.addEventListener("DOMContentLoaded", function () {
  let weatherCards = document.querySelectorAll(".weather-cards");
  let mainSection = document.querySelector("[data-main-section]");

  function changeContent(newContent) {
    mainSection.innerHTML = newContent;
  }

  weatherCards.forEach(function (card) {
    card.addEventListener("click", function () {
      let clickedCard = card.getAttribute("data-card");
      let htmlOfClickedCard = card.outerHTML;
      let chosenSnippet =
        "Awaiting snippet of information relating to weather.";
      chosenSnippet = getChosenSnippet(htmlOfClickedCard, snippets);

      let secondView = `
        <!-- Exit icon -->
        <section class="cross-icon-container row">
          <a href="index.html" class="col-12k">
            <img
              class="cross-icon animate-click"
              src="assets/images/cross-icon.png"
              alt="cross/exit icon"
              style="width: 2rem; height: 2rem"
            />
          </a>
        </section>
        <!-- /Exit icon -->
        <section class="weather-and-audio-icons row align-items-center">
          <!-- Weather details -->
          <div class="d-none d-md-block col-md-3">
            <div
              class="info-boxes weather-details-container d-flex align-items-center"
              data-weather-details
            >
              <ul>
                <li>Wind =</li>
                <li>Precipitation =</li>
                <li>Feels like =</li>
                <li>Humidity =</li>
              </ul>
            </div>
          </div>
          <!-- /Weather details -->
          <!-- Weather Icon -->
          <div class="col-4 col-md-6">
            ${htmlOfClickedCard}
          </div>
          <!-- /Weather Icon -->
          <!-- Audio + message -->
          <div class="col-8 col-md-3 align-items-center">
            <div
              class="info-boxes audio-message-container row d-flex align-items-center justify-content-center"
            >
              <i class="fa-solid fa-volume-high col-12 align-self-end animate-click" title="sound icon" data-play-sound></i>
              <p class="col-12" data-sound-text>
                Click icon above to hear sounds of when it is (weatherType)
              </p>
            </div>
          </div>
          <!-- /Audio + message -->
        </section>
        <!-- Snippet -->
        <section class="info-boxes snippet-container row">
          <div class="snippet col-12" data-snippet>
            <p>
              ${chosenSnippet}
            </p>
          </div>
        </section>
        <!-- /Snippet -->
        <section class="back-and-learn-btn-container row justify-content-between">
          <!--- Go back button -->
          <div class="col-4 col-md-3">
            <a href="index.html">
              <div class="go-back-btn buttons blue-button animate-click">
                Go back<br /><i
                  class="fa-solid fa-arrow-left"
                ></i>
              </div>
            </a>
          </div>
          <!--- /Go back button -->
          <!-- Learn more button -->
          <div class="col-4 col-md-3">
            <div class="learn-more-btn buttons blue-button animate-click" data-learn-more-btn>
              Learn<br />More
            </div>
          </div>
          <!-- /Learn more button -->
        </section>
      `;
      let averagedWeatherDetails;

      switch (clickedCard) {
        case "still-night-card":
          averagedWeatherDetails =
            periodsOfTheDayAveragesGlobal.stillNightAverages;
          break;
        case "morning-card":
          averagedWeatherDetails =
            periodsOfTheDayAveragesGlobal.morningAverages;
          break;
        case "afternoon-card":
          averagedWeatherDetails =
            periodsOfTheDayAveragesGlobal.afternoonAverages;
          break;
        case "evening-card":
          averagedWeatherDetails =
            periodsOfTheDayAveragesGlobal.eveningAverages;
          break;
        case "night-card":
          averagedWeatherDetails = periodsOfTheDayAveragesGlobal.nightAverages;
          break;
        default:
          console.log(`Error, with clickedCard: ${clickedCard}`);
      }
      changeContent(secondView);
      setWeatherDetails(averagedWeatherDetails);

      /* 
      This click event executes the playSound function when the sound icon is clicked
      The correct sound to play with be determined by weatherType */
      document.addEventListener("click", function (event) {
        if (event.target.matches("[data-play-sound]")) {
          let weatherType = averagedWeatherDetails.weatherType;
          playSound(weatherType);
        }
      });

      /*
      This click event generates a new random snippet from the snippets object when the learn more button is clicked. 
      It then replaces the text content in the snippetContainer   */
      document.addEventListener("click", function (event) {
        if (event.target.matches("[data-learn-more-btn]")) {
          let snippetContainer = document.querySelector("[data-snippet]");
          let newRandomSnippet =
            snippets.random[Math.floor(Math.random() * snippets.random.length)];
          if (snippetContainer.querySelector("p")) {
            snippetContainer.querySelector("p").textContent = newRandomSnippet;
          }
          console.log("Clicked Learn More");
        }
      });
    });
  });
});

const snippets = {
  rainy:
    "Rain is the liquid form of water that falls from the sky in drops. Rain fills lakes, ponds, rivers, and streams. It provides the fresh water needed by humans, animals, and plants.",
  sunny:
    "The sun is a hot ball of gases that gives off great amounts of energy, it is the largest object in our solar system",
  cloudy:
    "Clouds are formed when damp air moves upwards, then cools down. The clouds are made up of droplets of water or tiny bits of ice, which fall as rain or hail, or sleet or snow, when the air around the cloud warms up.",
  stormy:
    "Storms tend to have thick dark clouds and strong winds. There is often heavy rain or sleet, hail or snow, and thunder and lightning.",
  snowy:
    "Snowflakes are formed in clouds when water vapour freezes around a tiny piece of dirt in the air and becomes so heavy that it falls to the ground. Snowflakes have six sides and can be formed of 200 ice crystals.",
  random: [
    "A lightning bolt can be hotter than the sun – 30,000 degrees Celsius. The energy in this could keep a lightbulb lit for 3 months!",
    "The fastest wind ever recorded in the UK was 142mph on the 13th February 1989 in Scotland – that’s over twice as fast as a cheetah can run!",
    "The coldest temperature ever recorded was -89° Celsius in Antarctica in 1983",
    "Thunder is one of the loudest noises in nature. It occurs when electricity made inside a cloud shoots towards the ground as lightning and heats the air. It is this heating up of the air that causes the thundering noise.",
    "Many countries such as those in Asia and North America experience extreme winds and storms such as hurricanes, cyclones, tornadoes.These all have very strong winds which can knock buildings over and rip trees up from the ground. They can also cause flooding.",
    "Changes in temperature cause winds to form which then move pockets of warm or cold air around.",
    "When air is moved up (vertically) it can cause clouds to form and may result in precipitation (rain) and storms.",
    "The weather in the UK is warmer when we are closer to the sun in the summer, and when warm winds blow warm air in from the south.",
    "Winters tend to be colder and have more rain, sleet, hail and snow, while summer tends to be warmer and sunnier. Some countries are warm all year round, while others are cold all year round.",
    "Weather is the way the air and the atmosphere feels. It includes the outside temperature, strength of the wind, and whether it is raining, sunny, hailing, snowing, sleeting, foggy, or cloudy.",
  ],
};
