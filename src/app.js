// app.js
const rev = require("./reversi.js");

let makeBoard = rev.generateBoard;
board = makeBoard(4,4);
let flipCells = rev.flipCells;
let stringBoard = rev.boardString;
// let setCell = rev.setBoardCell;
// setCell(board, "X", 1,1);
// let notation = rev.algebraicToRowCol;
// let arrayOfCharacters = notation("A2 ");
// //console.log(arrayOfCharacters);
let placeLetter = rev.placeLetter;
let placeLetters = rev.placeLetters;
let boardString = rev.boardToString;
let getCellsToFlip = rev.getCellsToFlip;
//placeLetter(board, "X", "B2");
// placeLetter(board,"X","D1");
// placeLetter(board,"X","A4");
// placeLetter(board,"O","D2");
// placeLetter(board,"O","D3");
// placeLetter(board,"O","B4");
// placeLetter(board,"O","C4");
// placeLetter(board, "X", "D4");
placeLetters(board, 'O', 'B3', 'C3', 'D2');
rev.placeLetters(board, 'X', 'A3', 'D1', 'D3');
//last move: C3 is [2,2]
//board = flipCells(board, [[[0,1],[0,0]],[1,1]]);
//const moves = getCellsToFlip(board, 3,3);
const moves = getCellsToFlip(board, 2, 3);
console.log(moves);
