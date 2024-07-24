//  9 options
//
// 2 players
const players = ["X", "O"];
// current player
let currentPlayer = players[0];

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

function Game(player, position) {
  //   const newBoard = [
  //     ...board.slice(0, position),
  //     player,
  //     ...board.slice(position + 1),
  //   ];
  board.splice(position, 1, player);
  checkWinning(board, player);
  return board;
}
function checkWinning(board, player) {
  for (const combination of winning_combinations) {
    const [a, b, c] = combination;
    if (board[a] === player && board[b] === player && board[c] === player) {
      return true;
    }
  }
  return false;
}

const play = Game(players[0], board[2]);
const play1 = Game(players[1], board[1]);
const play2 = Game(players[0], board[0]);
const play3 = Game(players[1], board[3]);
const play4 = Game(players[0], board[4]);
const play5 = Game(players[1], board[5]);
const play6 = Game(players[0], board[8]);
const play7 = Game(players[1], board[7]);
const play8 = Game(players[0], board[6]);

console.log(play5);
