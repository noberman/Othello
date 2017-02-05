// reversi.js

function repeat(value, n){
  let arr = [value];
  for(let i = 0; i<n-1; i++){
    arr.push(value);
  }
  return arr;
}

function generateBoard(rows, columns, initialCellValue = "num"){
  const num = rows * columns;
  let arr = [initialCellValue];
  for(let i = 0; i < num - 1; i++){
    arr.push(initialCellValue);
    //console.log(arr[i]);
  }
  return arr;
}

function rowColToIndex(board, rowNumber, columnNumber){
  const boardLength = Math.sqrt(board.length);
  let index = rowNumber*boardLength+columnNumber;
  return index;
}

function indexToRowCol(board ,i){

}

function setBoardCell(board, letter, row, col){

}

function algebraicToRowCol(algebraicNotation){

}

function placeLetter(board, letter, algebraicNotation){

}

function placeLetters(board, letter, algebraicNotation){

}

function boardToString(board){

}

function isBoardFull(board){

}

function flip(board, row, col){

}

function flipCells(board, cellsToFlip){

}

function getCellsToFlip(board, lastRow, lastCol){

}

function isValidMove(board, letter, row, col){

}

function isValidMoveAlgebraicNotation(board, letter, algebraicNotation){

}

function getLetterCounts(board){

}

function getValidMoves(board, letter){

}


module.exports = {
  repeat: repeat,
  generateBoard: generateBoard,
  rowColToIndex: rowColToIndex,
  indexToRowCol: indexToRowCol,
  setBoardCell: setBoardCell,
  algebraicToRowCol: algebraicToRowCol,
  placeLetter: placeLetter,
  placeLetters: placeLetters,
  boardToString: boardToString,
  isBoardFull: isBoardFull,
  flip: flip,
  flipCells: flipCells,
  getCellsToFlip: getCellsToFlip,
  isValidMove: isValidMove,
  isValidMoveAlgebraicNotation: isValidMoveAlgebraicNotation,
  getLetterCounts: getLetterCounts,
  getValidMoves: getValidMoves,
}
