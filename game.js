const player1Name = document.getElementById("player1Name");
const player2Name = document.getElementById("player2Name");

let boxes = Array.from(document.getElementsByClassName("box"));
let playersNames = JSON.parse(localStorage.getItem("players"));
console.log(playersNames);

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;

let spaces = Array(9).fill(null);
let count_plays = 0;

let game_name = document.getElementById("game_name");
let scoreX = document.getElementById("scoreX");
let scoreO = document.getElementById("scoreO");

let X_score = 0;
let O_score = 0;

let restartBtn = document.getElementById("restartBtn");
const modalRef = document.getElementById("modal");

let exitBtn = document.getElementById("exitBtn");

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

restartBtn.addEventListener("click", restart);

exitBtn.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});

window.addEventListener("beforeunload", function (event) {
  var message = "Are you sure? your data will be deleted";
  event.returnValue = message;
  return message;
});

function boxClicked(e) {
  const id = e.target.id;

  if (!spaces[id] && count_plays < 9) {
    handleMove(id, e);
  }

  if (count_plays === 9) {
    handleDraw();
  }
}

function handleMove(id, e) {
  spaces[id] = currentPlayer;
  e.target.innerText = currentPlayer;

  if (playerHasWon() !== false) {
    handleWin();
  } else {
    switchPlayer();
  }
}

function handleWin() {
  if (currentPlayer === X_TEXT) {
    game_name.innerHTML = `${playersNames?.player1} has won!`;
    if (scoreX) {
      X_score++;
      scoreX.innerText = `${X_score}`;
    }
  } else {
    game_name.innerHTML = `${playersNames?.player2} has won!`;
    if (scoreO) {
      O_score++;
      scoreO.innerText = `${O_score}`;
    }
  }

  let winning_blocks = playerHasWon();
  count_plays = 10;
  winning_blocks.forEach(
    (box) => (
      (boxes[box].style.backgroundColor = "#c9c7c7"),
      (boxes[box].style.color = "#ff7eb9")
    )
  );
}

function switchPlayer() {
  count_plays++;
  currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
}

function handleDraw() {
  game_name.innerHTML = `Draw Game!`;
  boxes.forEach((box) => (box.style.backgroundColor = "#ff7eb9"));
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

function restart() {
  document.getElementById("overlay").style.display = "block";

  modalRef.addEventListener("click", (e) => {
    if (e.target.id === "confirmRestart") {
      document.getElementById("overlay").style.display = "none";

      spaces.fill(null);

      boxes.forEach((box) => {
        box.innerText = "";
        box.style.color = "";
        box.style.backgroundColor = "";
      });

      game_name.innerHTML = "Tic Tac Toe";
      currentPlayer = X_TEXT;
      count_plays = 0;
    } else if (e.target.id === "cancelRestart") {
      document.getElementById("overlay").style.display = "none";
    }
  });
}

startGame();
