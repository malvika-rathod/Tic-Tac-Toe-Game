const board = document.getElementById("board");
const currentPlayerText = document.getElementById("current-player");
const resetButton = document.getElementById("reset-button");

let currentPlayer = "cross";
let cells = Array(9).fill(null);

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    if (value) cell.classList.add(value);
    cell.addEventListener('click', () => handleClick(index));
    board.appendChild(cell);
  });

  currentPlayerText.textContent = `Current Player: ${currentPlayer.toUpperCase()}`;
}

function handleClick(index) {
  if (cells[index] || checkWinner()) return;
  cells[index] = currentPlayer;
  currentPlayer = currentPlayer === "cross" ? "circle" : "cross";
  renderBoard();

  const winner = checkWinner();
  if (winner || winner === "draw") {
    localStorage.setItem('winner', winner);
    window.location.href = 'result.html';
  }
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a] && cells[a] === cells[b] && cells[b] === cells[c]) {
      return cells[a];
    }
  }
  return cells.every(Boolean) ? "draw" : null;
}

function resetGame() {
  cells = Array(9).fill(null);
  currentPlayer = "cross";
  renderBoard();
}

resetButton.addEventListener("click", resetGame);

renderBoard();
