const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");

let boxes = Array.from(document.getElementsByClassName("box"));
let playersNames = JSON.parse(localStorage.getItem("players"));

let spaces = Array(9).fill(null);
let count_plays = 0;

const startGame = () => {
    player1Name.innerHTML = `${playersNames?.player1}: `;
    player2Name.innerHTML = `${playersNames?.player2}: `;
    boxes.forEach((box) => box.addEventListener("click", boxClicked));
  };






  function boxClicked(e) {
    const id = e.target.id;
  
    if (!spaces[id] && count_plays < 9) {
      handleMove(id, e);
    }
  
    if (count_plays === 9) {
      handleDraw();
    }
  }
  