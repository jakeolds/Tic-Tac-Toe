
let currentPlayer = 'X';
let gameOver = false;

function makeMove(cell) {
  if (!cell.innerHTML && !gameOver) {
    cell.innerHTML = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('turn').innerHTML = gameOver ? '' : currentPlayer + "'s Turn";
  }
}

function checkWin() {
  const cells = document.getElementsByClassName('cell');
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (cells[a].innerHTML && cells[a].innerHTML === cells[b].innerHTML && cells[a].innerHTML === cells[c].innerHTML) {
      declareWinner(cells[a].innerHTML, combo);
      return;
    }
  }

  // Check for draw
  function checkForDraw(cells) {
    let isDraw = true;
    for (const cell of cells) {
      if (!cell.innerHTML) {
        isDraw = false;
        break;
      }
    }

    if (isDraw) {
      declareWinner("No One", []);
    }
  }

  // Call the checkForDraw function
  checkForDraw(cells);
}

function declareWinner(winner, winningCombo) {
  gameOver = true;
  document.getElementById('turn').innerHTML = winner === "No One" ? "It's a Draw!" : winner + " Wins!";

  // Show the winner text bar
  const winnerAlert = document.getElementById('winner-alert');
  const winnerText = document.getElementById('winner-text');
  winnerText.textContent = winner === "No One" ? "It's a Draw!" : winner + " Wins!";
  winnerAlert.classList.remove('d-none');
}

function restartGame() {
  const cells = document.getElementsByClassName('cell');
  for (const cell of cells) {
    cell.innerHTML = '';
    cell.classList.remove('bg-success');
  }
  currentPlayer = 'X';
  gameOver = false;
  document.getElementById('turn').innerHTML = "X's Turn";
  document.getElementById('winner-alert').classList.add('d-none');
}

function incrementWins(playerId) {
    const winsElement = document.getElementById(playerId);
    const currentWins = parseInt(winsElement.textContent);
    winsElement.textContent = currentWins + 1;
  }