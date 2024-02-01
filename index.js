const errorMessage = document.querySelector(".errorMessage");
const formData = document.querySelector("form");
const inputs = document.querySelectorAll("input");
let isValid = false;
let players;

formData.addEventListener("submit", function (e) {
    e.preventDefault();
  
    if (isValid) {
      setForm();
      localStorage.setItem("players", JSON.stringify(players));
      window.location.href = "game.html";
    } else {
      alert("All fields data required");
    }
  });

  formData.addEventListener("input", function () {
    isValid = validateNames();
  });
  
  function setForm() {
    players = {
      player1: inputs[0].value,
      player2: inputs[1].value,
    };
  }


  function validateNames() {
    const regexStyle = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/;
    let valid = true;
  
    for (let i = 0; i < inputs.length; i++) {
      const input = inputs[i];
  
      if (regexStyle.test(input.value)) {
        errorMessage.classList.add("hidden");
      } else {
        errorMessage.classList.remove("hidden");
        valid = false;
      }
    }
  
    return valid;
  }