// Retain existing game logic

const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
// board
const board = [0, 1, 2, 3, 4, 5, 6, 7, 8];

function checkWinning(board, player) {
  for (const combination of winning_combinations) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

// Factory function to create a player
function CreatePlayer(symbol, name) {
  return {
    symbol,
    name,
    plays(position) {
      // Validate the move
      if (typeof board[position] === "number") {
        // Update the board with the player's symbol
        board[position] = this.symbol;

        // Check if this move wins the game
        if (checkWinning(board, this.symbol)) {
          showMessage(`${this.name} (${this.symbol}) wins!`);
          disableBoard();
        } else if (board.every((val) => typeof val === "string")) {
          showMessage("It's a tie!");
        } else {
          currentPlayer = currentPlayer === playerX ? playerO : playerX;
          showMessage(`${currentPlayer.name}'s (${currentPlayer.symbol}) turn`);
        }
      } else {
        showMessage("Invalid move! Position already taken.");
      }
    },
  };
}

// Display message on the screen
function showMessage(message) {
  document.getElementById('messages').textContent = message;
}

// Disable the board after game ends
function disableBoard() {
  cells.forEach(cell => {
    cell.style.pointerEvents = 'none';
  });
}

// Reset board interaction
function enableBoard() {
  cells.forEach(cell => {
    cell.style.pointerEvents = 'auto';
  });
}

// Create players
let playerX = CreatePlayer("X", "Player X");
let playerO = CreatePlayer("O", "Player O");
let currentPlayer = playerX;

// Initialize the board
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
const playerXNameInput = document.getElementById('playerXName');
const playerONameInput = document.getElementById('playerOName');
const playerXSymbolButton = document.getElementById('playerXSymbol');
const playerOSymbolButton = document.getElementById('playerOSymbol');

// Function to update the board UI
function updateBoardUI() {
  cells.forEach((cell, index) => {
    cell.textContent = board[index] !== index ? board[index] : '';
    cell.classList.toggle('taken', cell.textContent !== '');
  });
}

// Add event listeners to cells
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = parseInt(cell.getAttribute('data-index'));
    if (typeof board[index] === 'number') {
      currentPlayer.plays(index);
      updateBoardUI();
    }
  });
});

// Add event listener to reset button
resetButton.addEventListener('click', () => {
  board.fill(null).forEach((_, index) => board[index] = index);
  currentPlayer = playerX;
  updateBoardUI();
  enableBoard();
  showMessage(`${currentPlayer.name}'s (${currentPlayer.symbol}) turn`);
});

// Add event listeners to player name inputs and symbol buttons
playerXNameInput.addEventListener('input', (e) => {
  playerX.name = e.target.value || "Player X";
  showMessage(`${currentPlayer.name}'s (${currentPlayer.symbol}) turn`);
});

playerONameInput.addEventListener('input', (e) => {
  playerO.name = e.target.value || "Player O";
  showMessage(`${currentPlayer.name}'s (${currentPlayer.symbol}) turn`);
});

playerXSymbolButton.addEventListener('click', () => {
  playerX.symbol = "X";
  playerO.symbol = "O";
  showMessage(`${playerX.name} is X, ${playerO.name} is O`);
});

playerOSymbolButton.addEventListener('click', () => {
  playerX.symbol = "O";
  playerO.symbol = "X";
  showMessage(`${playerX.name} is O, ${playerO.name} is X`);
});

// Initial UI setup
updateBoardUI();
showMessage(`${currentPlayer.name}'s (${currentPlayer.symbol}) turn`);
