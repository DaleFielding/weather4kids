/*
This event listener:
1) Waits for DOM content to fully load before accessing the class and data attributes that are needed and storing them as variables.
2) ChangeToForm function is created which changed the inner HTML of main content.
3) Click event listener is added on the contact button
4) Alternative HTML is declared and passed into changeToForm.
5) HTML form elements are stored into variables
6) Submit event listener is added.
  6a) This will carry out various checks for form validation
  6b) If any errors these will be displayed in the form
  6c) If no errors a thank you message will replace the button HTML, any error messages will be removed from dsiplay in the browser and the form will be reset.
*/
document.addEventListener("DOMContentLoaded", function () {
  let contactButton = document.querySelector("[data-contact-button]");
  let mainContent = document.querySelector("[data-main-content]");

  function changeToForm(newContent) {
    mainContent.innerHTML = newContent;
  }
  contactButton.addEventListener("click", function () {
    let htmlOfForm = `
    <!-- Exit icon -->
    <section class="cross-icon-container row mt-sm-2">
      <a href="index.html" class="col-12">
        <img
          class="cross-icon animate-click"
          src="assets/images/cross-icon.png"
          alt="cross/exit icon"
          style="width: 2rem; height: 2rem"
        />
      </a>
    </section>
    <!-- /Exit icon -->
    <!-- Contact Form -->
    <section>
      <form id="my-form" class="mt-sm-4 pb-4 row" data-form>
          <div class="row justify-content-center align-items-center">
            <h3 class="intro-message col-10 col-sm-9 text-center">
              We would love to hear any feedback or suggestions, please let us
              know in the form below if you have any.
            </h3>
          </div>
          <div class="mb-2 col-10 col-sm-8 offset-1 offset-sm-2">
            <label for="name" class="form-label col-8">&nbsp; Name:</label>
            <input
              type="name"
              class="form-control"
              id="name"
              placeholder="Enter your name here"
              aria-label="Name"
              required
            />
          </div>
          <div class="mb-2 col-10 col-sm-8 offset-1 offset-sm-2">
            <label for="email" class="form-label">&nbsp; Email:</label>
            <input
              type="email"
              class="form-control"
              id="email"
              placeholder="Enter your email address here"
              aria-label="Email"
              required
            />
            <div class="mt-2 pb-4">
              <label for="message" class="form-label">&nbsp; Message:</label>
              <textarea
                class="form-control"
                id="message"
                placeholder="Enter your message here"
                rows="6"
                aria-label="Message"
                required
              ></textarea>
            </div>
          </div>
          <div
            data-validation-errors
            class="form-validation-errors col-10 offset-1 pb-4 text-center"
          ></div>
          <div class="col-4 col-md-3">
            <a href="index.html">
              <div class="go-back-btn buttons blue-button animate-click">
                Go back<br /><i class="fa-solid fa-arrow-left"></i>
              </div>
            </a>
          </div>
          <div class="col-6 col-md-4 offset-2 offset-md-5">
            <button
              class="submit-button buttons blue-button animate-click"
              id="submit"
              type="submit"
              form="my-form"
              aria-label="Submit Form"
            >
              <div>Submit</div>
            </button>
          </div>
      </form>
    </section>
    <!-- /Contact form -->
      `;
    changeToForm(htmlOfForm);

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const message = document.getElementById("message");
    const myForm = document.getElementById("my-form");
    const errorId = document.querySelector("[data-validation-errors]");

    myForm.addEventListener("submit", function (e) {
      let errorMessages = [];
      if (name.value.length <= 1) {
        errorMessages.push("name must have more than character");
      }
      if (email.value.length <= 3) {
        errorMessages.push("email must have more than 3 characters");
      }
      if (message.value.length < 10 || message.value.length > 100) {
        errorMessages.push(
          "message must be between 10 and 100 characters long"
        );
      }

      if (errorMessages.length > 0) {
        e.preventDefault();
        errorId.innerText = errorMessages.join(", ");
      } else {
        e.preventDefault();
        document.getElementById("submit").outerHTML = `
        <div class="text-center">
          <h4 class="m-0">Thank you for contacting us!</h4>
          <i class="fa-regular fa-face-smile"></i>
        </div>
        `;
        myForm.reset();
        errorId.innerText = "";
      }
    });
  });
});
