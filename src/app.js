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
let boardString = rev.boardToString;
//placeLetter(board, "X", "B2");
placeLetter(board,"X","B1");
placeLetter(board,"X","A1");
placeLetter(board, "X", "B2");
//board = flipCells(board, [[[0,1],[0,0]],[1,1]]);
let string = boardString(board);
console.log(string);
console.log(board);
//console.log(board);


// function boardToString(board){
// 	let img = "";
// 	const len = Math.sqrt(board.length);
// 	const row = 2*(len+1);
// 	for(let i=0;i<row;i++){
// 		for(let j=0;j<len+1;j++){
// 			if(i%2===0){
// 				if(i===0) {
// 					if(j===0){
// 						img+="   ";
// 					}else if(j===len){
// 						img+=("  "+String.fromCharCode(65+j-1)+" ");
// 					}else{
// 						img+=("  "+String.fromCharCode(65+j-1)+" ");
// 					}
// 				}else{
// 					if(j===0) img+=((Math.floor(i/2))+"  |");
// 					else{
// 						const content = board[rowColToIndex(board,Math.floor(i/2)-1,j-1)];
// 						if(!(content===" ")) img+=(" "+content+" |");
// 						else img+="   |";
// 					}
// 				}
// 			}else{
// 				if(j===0) img+="   +";
// 				else img+="---+";
// 			}
// 		}
// 		img+="\n";
//
// 	}
// 	return img;
// }
