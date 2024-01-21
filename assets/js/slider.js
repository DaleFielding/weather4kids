document.addEventListener("DOMContentLoaded", function () {
  const laterButton = document.querySelector("[data-later-button]");

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
});

//   earlierButton.addEventListener("click", function () {
//     console.log("earlier");
//
//   });
// });
