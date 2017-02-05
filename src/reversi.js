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

function algebraicToRowCol(algebraiNotation){

}

module.exports = {
  repeat: repeat,
  generateBoard: generateBoard,
  rowColToIndex: rowColToIndex,
  indexToRowCol: indexToRowCol,
  setBoardCell: setBoardCell,
  algebraicToRowCol: algebraicToRowCol,
  
}
