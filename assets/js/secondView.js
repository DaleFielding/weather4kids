
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
      <p>Test - Clicked on ${clickedCard}</p>
      `;
      changeContent(secondView);
    });
  });
});