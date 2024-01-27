const name = document.getElementById("name");
const email = document.getElementById("email");
const message = document.getElementById("message");
const myForm = document.getElementById("my-form");
const errorId = document.querySelector("[data-validation-errors]");

myForm.addEventListener("submit", (e) => {
  let errorMessages = [];
  if (name.value.length <= 1) {
    errorMessages.push("name must have more than 1 character");
  }
  if (email.value.length <= 3) {
    errorMessages.push("email must have more than 3 characters");
  }
  if (message.value.length < 10 || message.value.length > 100) {
    errorMessages.push("message must be between 10 and 100 characters long");
  }
  if (errorMessages.length > 0) {
    e.preventDefault();
    errorId.innerText = errorMessages.join(", ");
  }
});
