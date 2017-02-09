// app.js
/* eslint semi: "off" */
const rev = require('./reversi.js');
const readlineSync = require('readline-sync');
const fs = require('fs');

let boardSettings;
let playerLetter;
let ComputerLetter;
let boardSize;
let gameOn = true;
let board;
let response;
let passCount = 0;
let humanTurn = true;


console.log('Welcome to Othello!\n');

while(gameOn){
  let choice = readlineSync.question('Please choose a mode: \n 1) Configuration File \n 2) Set up your own Game \n>')
  if(choice === "1"){
    if(process.argv[2]!==undefined){
      fs.readFile(process.argv[2], 'utf8', function(err, data) {
       if (err) {
        console.log('there\'s an error', err);
       } else {
         //console.log(data);
         let boardSettings = JSON.parse(data);
         let playerLetter = boardSettings['boardPreset']['playerLetter'];
         let board = boardSettings['boardPreset']['board'];
         let computerMoves = boardSettings["scriptedMoves"]["computer"];
         let playerMoves = boardSettings["scriptedMoves"]["player"];
         let computerLetter;
         console.log("These are th player moves: "+ playerMoves);
         console.log("These are the computer moves: " + computerMoves);
         //figure out the right letter
         if(playerLetter === "X"){
           ComputerLetter = "O";
         }else{
           ComputerLetter = "X";
         }

         if(playerLetter === "X"){
           humanTurn = true;
         }else{
           humanTurn = false;
         }

         while(playerMoves.length > 0 || computerMoves.length >0){
           if(humanTurn){
             readlineSync.question("Press Enter to see player's move");
             if(playerMoves.length>0){
               let curInfo = playerMoves.shift();
               rev.placeLetter(board, playerLetter, curInfo);
               //console.log(rev.boardToString(board));

               let info = rev.algebraicToRowCol(curInfo);
               //console.log(info);
               let cellsToFlip = rev.getCellsToFlip(board, info["row"], info["col"]);

               for(let i=0; i<cellsToFlip.length; i++){
                 for(let j = 0; j<cellsToFlip[i].length; j++){
                   rev.flip(board,cellsToFlip[i][j][0], cellsToFlip[i][j][1]);
                 }
               }
              }
              console.log(rev.boardToString(board));
              humanTurn = false;
            }else{  //computer turn
               if(computerMoves.length>0){
                 readlineSync.question("Press Enter to see computer's move");
                 let curInfo = computerMoves.shift();
                 rev.placeLetter(board, ComputerLetter, curInfo);
                 //console.log(rev.boardToString(board));

                 let info = rev.algebraicToRowCol(curInfo);
                 //console.log(info);
                 let cellsToFlip = rev.getCellsToFlip(board, info["row"], info["col"]);

                 for(let i=0; i<cellsToFlip.length; i++){
                   for(let j = 0; j<cellsToFlip[i].length; j++){
                     rev.flip(board,cellsToFlip[i][j][0], cellsToFlip[i][j][1]);
                    }
                  }
                }
                console.log(rev.boardToString(board));
                humanTurn = true;
              }
            }

          //put printouts here
          console.log(rev.boardToString(board));
          console.log("Score ");
          console.log("======");
          //console.log(board);
          let count = rev.getLetterCounts(board);
          console.log("X:" + count["X"] + ", " + " O:" + count["O"]);

      }
    });
  }else{
      console.log("file not read");
    }
    gameOn = false;
  }else if(choice === "2"){
    while(boardSize%2 !==0 || (boardSize<4 || boardSize>26) ){
      boardSize = readlineSync.question('How wide should the board be? (Please enter an even integer from 4-26) \n>');
    }

    while(!((playerLetter=== "O") || (playerLetter === "X"))){
      playerLetter = readlineSync.question('Pick your Letter: X (black) or O (White) \n>');
      if(playerLetter === "X"){
        ComputerLetter = "O";
      }else{
        ComputerLetter = "X";
      }
      //console.log(playerLetter=== "X");
    }
    board = rev.generateBoard(boardSize, boardSize);
    rev.setBoardCell(board,'O',boardSize/2,boardSize/2);
    rev.setBoardCell(board,'O', boardSize/2-1, boardSize/2-1);
    rev.setBoardCell(board,'X', boardSize/2-1, boardSize/2);
    rev.setBoardCell(board,'X', boardSize/2, boardSize/2-1);


    if(playerLetter === "X"){
      humanTurn = true;
    }else{
      humanTurn = false;
    }
    console.log(rev.boardToString(board));
    while(!(rev.isBoardFull(board))){
      //console.log(rev.boardToString(board));
      //checking for passes
      if(passCount===2){
        console.log("There has been two consecutive passes so the game is over")
        break;
      }
      if(humanTurn){
        //Player turn
        if(rev.getValidMoves(board, playerLetter).length >0){
          while(!(rev.isValidMoveAlgebraicNotation(board, playerLetter, response))){
            response = readlineSync.question('What is your move? \n>');

            if(rev.isValidMoveAlgebraicNotation(board, playerLetter, response)){
              //console.log("blob");
              rev.placeLetter(board, playerLetter, response);
              passCount = 0;
              //console.log("blob");
              //console.log(rev.boardToString(board));
              //console.log(response);
              //console.log(response);
              let info = rev.algebraicToRowCol(response);
              //console.log(info);
              let cellsToFlip = rev.getCellsToFlip(board, info["row"], info["col"]);

              for(let i=0; i<cellsToFlip.length; i++){
                for(let j = 0; j<cellsToFlip[i].length; j++){
                  rev.flip(board,cellsToFlip[i][j][0], cellsToFlip[i][j][1]);
                }

              }
              break;

            }else{
            console.log("Invalid Move! Your move should: ");
            console.log("* be in the right format (A7 or D2)");
            console.log("* specify and existing empty cell");
            console.log("* flip at least one of your opponent's pieces");
            //console.log(playerLetter);
            //console.log(rev.getValidMoves(board, playerLetter));
            }
          }
        }else{
          readlineSync.question("No valid moves available please press <Enter> to show computer move");
          passCount++;
        }
        humanTurn = false;
        readlineSync.question("Please press <Enter> to show computers move");

      }else{
        //ComputersMove
        if(rev.getValidMoves(board, ComputerLetter).length >0){
          let computerMoves = rev.getValidMoves(board,ComputerLetter);
          rev.setBoardCell(board, ComputerLetter, computerMoves[0][0], computerMoves[0][1])
          //console.log(computerMoves);
          //console.log(info);
          let cellsToFlip = rev.getCellsToFlip(board, computerMoves[0][0], computerMoves[0][1]);

          for(let i=0; i<cellsToFlip.length; i++){
            for(let j = 0; j<cellsToFlip[i].length; j++){
              rev.flip(board,cellsToFlip[i][j][0], cellsToFlip[i][j][1]);
            }
          }
          // console.log(rev.boardToString(board));
          // console.log("Score ");
          // console.log("======");
          // //console.log(board);
          // let count = rev.getLetterCounts(board);
          // console.log("X:" + count["X"] + ", " + " O:" + count["O"]);
        }else{
          console.log("No available moves for the computer")
          passCount++;
        }
        humanTurn = true;
      }

      response = '';
      console.log(rev.boardToString(board));
      console.log("Score ");
      console.log("======");
      //console.log(board);
      let count = rev.getLetterCounts(board);
      console.log("X:" + count["X"] + ", " + " O:" + count["O"]);


    }
    console.log("Score ");
    console.log("======");
    //console.log(board);
    let count = rev.getLetterCounts(board);
    console.log("X:" + count["X"] + ", " + " O:" + count["O"]);
    if(count["X"]>count["O"]){
      console.log("Black Won!");
    }else if(count["X"]<count["O"]){
      console.log("White Won!");
    }else{
      console.log("It's a tie!!")
    }
    gameOn = false;
  }else{
    console.log("Please Choose either option 1 or 2");
  }
}
