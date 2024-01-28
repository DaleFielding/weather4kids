// Reminder - I need to remember to add comments, and tidy up my code.

document.addEventListener("DOMContentLoaded", function () {
  const laterButton = document.querySelector("[data-later-button]");
  const earlierButton = document.querySelector("[data-earlier-button]");

  const cardContainer = document.querySelector("[data-cards-container]");

  const lastCard = cardContainer.lastElementChild;
  const firstCard = cardContainer.firstElementChild;

  laterButton.addEventListener("click", function () {
    const currentCard = document.querySelector("[data-cards]:not(.d-none)");
    const nextCard = currentCard.nextElementSibling;
    const nextNextCard = nextCard.nextElementSibling;
    const prevCard = currentCard.previousElementSibling;

    if (currentCard && nextCard) {
      earlierButton.classList.remove("d-none");
      if (!nextCard.nextElementSibling) {
        laterButton.classList.add("d-none");
      }

      currentCard.classList.add("d-none", "d-sm-block", "col-sm-3");
      currentCard.classList.remove("col-sm-6");
      nextCard.classList.remove("d-none");
      nextCard.classList.add("col-12", "col-sm-6");

      if (prevCard) {
        prevCard.classList.remove("d-none", "d-sm-block", "col-sm-3");
        prevCard.classList.add("d-none");
      }

      if (nextNextCard) {
        nextNextCard.classList.add("d-sm-block", "col-sm-3");
      }

      lastCard.classList.add("d-sm-block", "col-sm-3");
      if (lastCard !== nextCard.nextElementSibling) {
        lastCard.classList.remove("d-sm-block", "col-sm-3");
      }

      if (prevCard !== firstCard) {
        firstCard.classList.remove("offset-sm-3");
      }
    }
  });

  earlierButton.addEventListener("click", function () {
    const currentCard = document.querySelector("[data-cards]:not(.d-none)");
    const prevCard = currentCard.previousElementSibling;
    const prevPrevCard = prevCard.previousElementSibling;
    const nextCard = currentCard.nextElementSibling;

    if (currentCard && prevCard) {
      laterButton.classList.remove("d-none");
      if (!prevCard.previousElementSibling) {
        earlierButton.classList.add("d-none");
      }

      currentCard.classList.add("d-none", "d-sm-block", "col-sm-3");
      currentCard.classList.remove("col-sm-6");
      prevCard.classList.remove("d-none");
      prevCard.classList.add("col-12", "col-sm-6");

      if (nextCard) {
        nextCard.classList.remove("d-none", "d-sm-block", "col-sm-3");
        nextCard.classList.add("d-none");
      }

      if (prevPrevCard) {
        prevPrevCard.classList.add("d-sm-block", "col-sm-3");
      }

      firstCard.classList.add("d-sm-block", "col-sm-3");
      if (firstCard !== prevCard.previousElementSibling) {
        firstCard.classList.remove("d-sm-block", "col-sm-3");
      }

      if (prevCard === firstCard) {
        firstCard.classList.add("offset-sm-3", "d-sm-block", "col-sm-3");
      }
    }
  });
});
