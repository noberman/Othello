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
  const info = {"row": rows ,"col": columns};
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
        //console.log(number[i])
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
   let line = "";
  for(let i=0; i<=2*(boardLength+1); i++){
    for(let j = 0; j<boardLength+1; j++){
      // if(i===1){
      //   //writing the first line A  B  C  D
      //   if(j<boardLength){
      //     line += ("  "+numberToLetter[j]+"   ");
      //   }else{
      //     line+= "  " + numberToLetter[j]+"   \n";
      //     break;
      //   }
      // // for every odd number row it will print out the +---+---+---+ lines
      // }else
      if((i%2)===0){
        if(i===0){
          if(j===0){
            line+= "   ";
          }else if(j===boardLength){
            line += "  " + String.fromCharCode(65+j-1) + "  ";
          }else {
            line += "  "+ String.fromCharCode(65+j-1)+ "  ";
          }
        }else {
          if(j===0){
            line += Math.floor(i/2)+ "  |";
          }else {
            const index = rowColToIndex(board, Math.floor(i/2)-1, j-1);
            const cell = board[index];
            if(cell!== " "){
              line+= " "+ cell+ " |";
            }else{
              line+= "   |";
            }
          }
        }
      }else{
        if(j===0){
          line+= "   +";
        }else{
          line+= "---+";
        }

      }
    }
    line+= "\n";
  }
  //console.log(line);
  return line;
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
  let info = arguments[1];
  let arrRows = info[0];
  let arrColumns = info[1];
  // console.log(info);
  // console.log(arrRows);
  // console.log(arrColumns);
  // console.log(arrRows.length);
  // console.log(arrColumns.length);
  if(Array.isArray(info[0][0])){
    for(let i =0; i< arrRows.length; i++){
      flip(board, arrRows[i][0], arrRows[i][1]);
    }
  }else{
    flip(board,arrRows[0], arrRows[1]);
  }
  if(Array.isArray(info[1][0])){
    for(let i =0; i< arrColumns.length; i++){
      flip(board, arrColumns[i][0], arrColumns[i][1]);
    }
  }else {
    flip(board,arrColumns[0], arrColumns[1]);
  }

  return board;
}
//use this function for Get Cells to Flip to help convert the index Arrays
function convertIndexArrayTolocation(board, arrIndex){
  const newArr = [];
  if(arrIndex[0]==="valid"){
    for(let i= 1; i<arrIndex.length; i++){
      let info = indexToRowCol(board, arrIndex[i]);
      let row = info["row"];
      let col = info["col"];
      newArr.push([row,col]);
    }
    //console.log(newArr);
    return newArr;
  }else return newArr;
}

function getCellsToFlip(board, lastRow, lastCol){
  const index = rowColToIndex(board, lastRow,lastCol);
  const boardLength = Math.sqrt(board.length);
  const lastLetterPlaced = board[index];
  let oppositeLetter;
  if(lastLetterPlaced === "X"){
    oppositeLetter = "O";
  }else{
    oppositeLetter = "X";
  }
  const arrRowsRightIndex = [];
  const arrRowsLeftIndex = [];
  const arrColUpIndex =[]
  const arrColDownIndex = [];


  //checking right row from last move
  for(let i=lastCol+1; i<boardLength;i++){
    let curIndex = rowColToIndex(board, lastRow, i)
    if(board[curIndex] === " "){
      break;
    }else if(board[curIndex] === oppositeLetter){
      arrRowsRightIndex.push(curindex);
    }else if(board[curIndex] === lastLetterPlaced){
      arrRowsRightIndex.unshift("valid");
      break;
    }
  }
//  console.log(arrRowsRightIndex);

  //checking left row from last more
  for(let i=lastCol-1; i>=0;i-- ){
    let curIndex = rowColToIndex(board, lastRow, i)
    if(board[curIndex] === " "){
      break;
    }else if(board[curIndex] === oppositeLetter){
      //console.log(curIndex);
      arrRowsLeftIndex.push(curIndex);
    }else if(board[curIndex] === lastLetterPlaced){
      arrRowsLeftIndex.unshift("valid");
      break;
    }
  }
  //console.log(arrRowsLeftIndex);

  //checking up column from last more
  for(let i=lastRow-1; i>=0;i-- ){
    let curIndex = rowColToIndex(board, i, lastCol)
    if(board[curIndex] === " "){
      break;
    }else if(board[curIndex] === oppositeLetter){
      arrColUpIndex.push(curIndex);
    }else if(board[curIndex] === lastLetterPlaced){
      arrColUpIndex.unshift("valid");
      break;
    }
  }
//
  //checking down column from last move
  for(let i=lastRow+1; i>boardLength;i++ ){
    let curIndex = rowColToIndex(board, i, lastCol)
    if(board[curIndex] === " "){
      break;
    }else if(board[curIndex] === oppositeLetter){
      arrColDownIndex.push(curIndex);
    }else if(board[curIndex] === lastLetterPlaced){
      arrColDownIndex.unshift("valid");
      break;
    }
  }
//  console.log(arrColDownIndex);
  // console.log(arrColUpIndex);
  // console.log(arrRowsLeftIndex);

  let arrRows = convertIndexArrayTolocation(board, arrRowsRightIndex).concat(convertIndexArrayTolocation(board,arrRowsLeftIndex));
  let arrCols = convertIndexArrayTolocation(board, arrColDownIndex).concat(convertIndexArrayTolocation(board, arrColUpIndex));
  //console.log(arrRows);
  //console.log(arrCols);
  let arrFinal =[];
  if(arrRows.length >0){
    arrFinal.push(arrRows);
  }
  if(arrCols.length >0){
    arrFinal.push(arrCols);  
  }
  //console.log(arrFinal);

  return arrFinal;

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
