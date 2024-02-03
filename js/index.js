// * =============> Global variables ===============>
const error = document.querySelector(".error");
const errorMessage1 = document.querySelector(".errorMessage1");
const errorMessage2 = document.querySelector(".errorMessage2");
const formData = document.querySelector("form");
const inputs = document.querySelectorAll("input");
let isValid = false;
let players;

// * =============> Events ===============>
formData.addEventListener("submit", function (e) {
  e.preventDefault();

  //Check if the form data is valid, if yes, set the form data and store it in local storage
  //If the form is not valid, reveal the error message by removing the "hidden" class
  if (isValid) {
    setForm();
    localStorage.setItem("players", JSON.stringify(players));
    window.location.href = "game.html";
  } else {
    error.classList.remove("hidden");
  }
});

formData.addEventListener("input", function () {
  isValid = validateNames();
  if (isValid === true) error.classList.add("hidden");
});

// * =============> Functions ===============>

//Function to Update the 'players' object with values from the input fields
function setForm() {
  players = {
    player1: inputs[0].value,
    player2: inputs[1].value,
  };
}

// Function to validate names using a regular expression
function validateNames() {
  const regexStyle = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
  let valid = true;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    if (regexStyle.test(input.value)) {
      i === 0
        ? errorMessage1.classList.add("hidden")
        : errorMessage2.classList.add("hidden");
    } else {
      i === 0
        ? errorMessage1.classList.remove("hidden")
        : errorMessage2.classList.remove("hidden");
      valid = false;
    }
  }

  return valid;
}
