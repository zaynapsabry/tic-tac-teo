const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");

let boxes = Array.from(document.getElementsByClassName("box"));
let playersNames = JSON.parse(localStorage.getItem("players"));

const startGame = () => {
    player1Name.innerHTML = `${playersNames?.player1}: `;
    player2Name.innerHTML = `${playersNames?.player2}: `;
    boxes.forEach((box) => box.addEventListener("click", boxClicked));
  };
  