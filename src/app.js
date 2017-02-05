// app.js
const rev = require("./reversi.js");

let makeBoard = rev.generateBoard;
board = makeBoard(3,3);
let setCell = rev.setBoardCell;
let b1 = setCell(board,"X", 1 ,1 );
console.log(b1);
let b2 = setCell(b1, "O",0 ,2 );
console.log(b2);
