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
  
  function setForm() {
    players = {
      player1: inputs[0].value,
      player2: inputs[1].value,
    };
  }