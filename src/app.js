// app.js
const rev = require("./reversi.js");

let makeBoard = rev.generateBoard;
board = makeBoard(3,3);
// let setCell = rev.setBoardCell;
// setCell(board, "X", 1,1);
// let notation = rev.algebraicToRowCol;
// let arrayOfCharacters = notation("A2 ");
// //console.log(arrayOfCharacters);
let placeLetter = rev.placeLetter;
placeLetter(board, "X","B2");
console.log(board);
