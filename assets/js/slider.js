document.addEventListener("DOMContentLoaded", function () {
  const laterButton = document.querySelector("[data-later-button]");
  const earlierButton = document.querySelector("[data-earlier-button]");

  laterButton.addEventListener("click", function () {
    console.log("later");

    const currentCard = document.querySelector("[data-cards]:not(.d-none)");
    const nextCard = currentCard.nextElementSibling;

    if (currentCard && nextCard) {
      currentCard.classList.add("d-none");
      nextCard.classList.remove("d-none");

      if (!nextCard.nextElementSibling) {
        laterButton.classList.add("d-none");
      }
    }
  });

  earlierButton.addEventListener("click", function () {
    console.log("earlier");

    const currentCard = document.querySelector("[data-cards]:not(.d-none)");
    const prevCard = currentCard.previousElementSibling;

    if (currentCard && prevCard) {
      currentCard.classList.add("d-none");
      prevCard.classList.remove("d-none");

      if (!prevCard.previousElementSibling) {
        earlierButton.classList.add("d-none");
      }
    }
  });
});

// Need to make it so that the today buttons reappear after clicking the other way.
