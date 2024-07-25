//  9 options
//
// 2 players

// function that has the board
// function that updates the board
// function that when player moves call the function that updates the board
// function that checks the board
// if the board has certain moves determins the winner
// clear the board
//

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
// factory function
// Function to create a player
function createPlayer(symbol) {
  return {
    symbol,
    plays(position) {
      // Validate the move
      if (typeof board[position] === "number") {
        // Update the board with the player's symbol
        board[position] = this.symbol;

        // Check if this move wins the game
        if (checkWinning(board, this.symbol)) {
          console.log(`Player ${this.symbol} wins!`);
          console.log("Final Board:", board);
        } else {
          console.log(`Player ${this.symbol} played. Board:`, board);
        }
      } else {
        console.log("Invalid move! Position already taken.");
      }
    },
  };
}
// Create players
const playerX = createPlayer("X");
const playerO = createPlayer("O");

// Example moves
playerX.plays(2); // Player X moves
playerO.plays(4); // Player O moves
playerX.plays(6); // Player X moves
playerX.plays(7); // Player X moves
playerX.plays(8); // Player X moves
