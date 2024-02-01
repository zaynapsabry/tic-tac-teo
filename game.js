const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");

let boxes = Array.from(document.getElementsByClassName("box"));
let playersNames = JSON.parse(localStorage.getItem("players"));

let spaces = Array(9).fill(null);
let count_plays = 0;

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  
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
  
  function playerHasWon() {
    for (const condition of winningCombos) {
      let [a, b, c] = condition;
  
      if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
        return [a, b, c];
      }
    }
    return false;
  }