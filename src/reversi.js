// reversi.js

function repeat(value, n){
  let arr = [value];
  for(let i = 0; i<n-1; i++){
    arr.push(value);
  }
  return arr;
}

function generateBoard(rows, columns, initialCellValue = " "){
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
  let rows, columns;
  newIndex = i+1;
  // if(i === 0){
  //   const info = {row: 0 ,col: 0};
  //   return info;
  // }
  const boardLength = Math.sqrt(board.length);
  rows = Math.ceil(i/(boardLength))-1;
  if(rows>0){
    columns = (newIndex - boardLength*rows)-1;
  }else columns = i;
  //columns = (newIndex - (boardLength*Math.floor(newIndex/(boardLength))))-1;
  const info = {row: rows ,col: columns};
  return info;
}

function setBoardCell(board, letter, row, col){
  let index = rowColToIndex(board,row,col);
  board[index] = letter;
  //console.log(board);
  return board;
}

function isLetter(c){
  //this part/Idea is taken from stackOverflow site
  return c.toLowerCase() != c.toUpperCase();
}

function algebraicToRowCol(algebraicNotation){
  let arr = algebraicNotation.split("");
  //console.log(arr);
  let letter, number;
  if(arr.length === 2){
    //console.log(isLetter(arr[0]));
    if(isLetter(arr[0])===false){
      return undefined;
    }
    if(isNaN(arr[1])) return undefined;
    letter = arr[0];
    number = arr[1];
    number = parseInt(number);

  }else if(arr.length === 3){
    if(isLetter(arr[0])===false){
      return undefined;
    }
    letter = arr[0];
    number = arr.slice(1);
    for(let i=0;i<number.length;i++){
      if(isNaN(number[i]) || number[i]===" "){
        console.log(number[i])
        return undefined;
      }
    }
    number = number.join("");
    number = parseInt(number);
  }else{
    return undefined;
  }
  const letterToNumber = {'A': 0, 'B': 1, 'C':2, 'D':3, 'E':4, 'F':5,
   'G':6, 'H':7, 'I':8, 'J':9, 'K':10, 'L':11, 'M':12, 'N':13, 'O':14, 'P':15,
   'Q':16, 'R':17, 'S':18, 'T':20, 'U':21, 'V':22, 'X':23, 'Y':24, 'Z':25};
  let column = letterToNumber[letter];
  let row = number-1;
  return {"row": row, "col": column};
}

function placeLetter(board, letter, algebraicNotation){
  let info = algebraicToRowCol(algebraicNotation);
  let row = info["row"];
  let column = info["col"];
  let index = rowColToIndex(board, row, column);
  board[index] = letter;
  return board;
}

function placeLetters(board, letter, algebraicNotation){
  for(let i= 2; i<arguments.length;i++){
    let info = algebraicToRowCol(arguments[i]);
    let row = info["row"];
    let column = info["col"];
    let index = rowColToIndex(board, row, column);
    board[index] = letter;
  }
  return board;
}

function boardToString(board){
  let boardLength = Math.sqrt(board.length);
  let numberToLetter = {0:'A', 1:'B', 2:'C', 3:'D', 4:'E', 5:'F',
   6:'G', 7:'H', 8:'I', 9:'J', 10:'K', 11:'L', 12:'M', 13:'N', 14:'O', 15:'P',
   16:'Q', 17:'R', 18:'S', 20:'T', 21:'U', 22:'V', 23:'X', 24:'Y', 25:'Z'};
  for(let i=1; i<=2*(boardLength+1); i++){
    for(let j = 0; j<boardLength+1; j++){
      if(i===1){
        for(let k=0; k<boardLength;k++){
          console.log(" "+numberToLetter[k]+"   ");
        }
      }
      if(i/2===0){

      }
    }
  }
}

function isBoardFull(board){
  for(let i =0; i<board.length; i++){
    if(board[i]===" ") return false;
  }
  return true;
}

function flip(board, row, col){
  let index = rowColToIndex(board, row, col)
  if(board[index]==="O"){
    board[index] = "X";
  }else if (board[index]=== "X"){
    board[index] = "O";
  }
  return board;
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
