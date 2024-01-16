
/*
This event listener:
1) Waits for DOM content to fully load before accessing the class and data attribute that are needed and storing them as variables
2) Defines a function changeContent that allows the inner html of the main content to be changed 
3) Loops over each weather card to add click event listeners for each card
  3a) When executed the value of the alt attribute is accessed and stored in the variable clickedCard
  3b) intended new content is declared under the variable secondView
4) changeContent function is called with secondView string passed in.   
*/
document.addEventListener("DOMContentLoaded", function () {
  let weatherCards = document.querySelectorAll('.weather-cards');
  let mainContent = document.querySelector('[data-main-content]');
  function changeContent (newContent) {
    mainContent.innerHTML = newContent;
  };
  weatherCards.forEach(function (card) {
    console.log(card);
    card.addEventListener("click", function () {
      let clickedCard = card.querySelector('.weather-icon').alt;
      let secondView = `
      <main class="container-fluid text-center">
      <!-- Intro Message -->
      <div class="row justify-content-center align-items-center">
        <h2 class="intro-message col-12 col-sm-9 text-center">
          Hi there! Please allow location access so that we can tell you the
          current weather. Or search for a city!
        </h2>
      </div>
      <!-- /Intro Message -->
      <!-- Exit icon -->
      <section class="cross-icon-container row">
        <a href="index.html" class="col-12">
          <img
            class="cross-icon"
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
          <div class="weather-details-container d-flex align-items-center">
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
          <div class="clicked-weather-card weather-cards">
            <img
              class="weather-icon"
              src="assets/images/weather-icons/rainy.png"
              alt="cloudy but sunny icon"
            />
          </div>
        </div>
        <!-- /Weather Icon -->
        <!-- Audio + message -->
        <div class="col-8 col-md-3 align-items-center">
          <div
            class="audio-message-container row d-flex align-items-center justify-content-center"
          >
            <i class="fa-solid fa-volume-high col-12 align-self-end"></i>
            <p class="col-12">
              Click icon above to hear sounds of when it is (weather type)
            </p>
          </div>
        </div>
        <!-- /Audio + message -->
      </section>
      <section class="snippet-container row">
        <div class="snippet col-12">
          <p>
            Snippet of information relating to the type of weather that was
            clicked.
          </p>
        </div>
      </section>
      <!-- /Snippet -->
      <section class="back-and-learn-btn-container row justify-content-between">
        <!--- Go back button -->
        <div class="col-4 col-md-3">
          <a href="index.html">
            <div class="go-back-btn">
              <strong>Go back</strong><br /><i
                class="fa-solid fa-arrow-left"
              ></i>
            </div>
          </a>
        </div>
        <!--- /Go back button -->
        <!-- Learn more button -->
        <div class="col-4 col-md-3">
          <div class="learn-more-btn">
            <strong>Learn<br />More</strong>
          </div>
        </div>
        <!-- /Learn more button -->
      </section>
    </main>
      `;
      changeContent(secondView);
    });
  });
});