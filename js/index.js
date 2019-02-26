'use strict';
var X = 0;
var Y = 0;
var output = document.getElementById('output');
var playerChoice;
var roundsLeft = 0;

function checkWinner() {
  if (roundsLeft <= X){
    alert('You won the entire game');
    roundsLeft = 0;
  } else if (roundsLeft <= Y){
    alert('You lost the entire game');
    roundsLeft = 0;
  }
}

var playerMove = function(playerChoice){
  if (roundsLeft > 0){
  if (playerChoice == 'rock' || playerChoice == 'paper' || playerChoice == 'scissors'){
      output.innerHTML = 'You played' + ' ' +  playerChoice + ',' 
    };

  
    var compChoice = Math.floor(Math.random()*3+1);
      if (compChoice == 1){
        compChoice = 'rock';
      } else if(compChoice == 2){
        compChoice = 'paper';
      } else if(compChoice == 3){
        compChoice = 'scissors';
      };
 
      output.innerHTML += ' ' + 'computer played' + ' ' + compChoice + '.';
    
    var compare = function(choice1,choice2){
      if (choice1 == choice2){
          return '<br>' + 'It is a Tie!';
        } else if (choice1 == 'rock'){
          if (choice2 == 'paper'){
            Y++;
            checkWinner();
            return '<br>' + 'You lost!';
          } else {
            X++;
            checkWinner();
            return '<br>' + 'You won!';
          }
        } else if (choice1 == 'paper'){
          if (choice2 == 'rock'){
            X++;
            checkWinner();
            return '<br>' + 'You won!';
          } else {
            Y++;
            checkWinner();
            return '<br>' + 'You lost!';
          }
        } else if (choice1 == 'scissors'){
          if (choice2 == 'rock'){
            Y++;
            checkWinner();
            return '<br>' + 'You lost!';
          } else {
            X++;
            checkWinner();
            return '<br>' + 'You won!';
          }
        }       
      } 
    } 

  
    var winner = compare(playerChoice, compChoice);
  output.innerHTML += winner;
   document.getElementById('X').innerHTML=X;
   document.getElementById('Y').innerHTML=Y;

 };

var newgame = document.getElementById('newgame');
var rounds = document.getElementById('rounds');


newgame.addEventListener('click', function(){

roundsLeft = window.prompt('How many wins should finish the entire game?');
  rounds.innerHTML = roundsLeft + ' wins finishes the entire game';
  if (roundsLeft == null){
    rounds.innerHTML = 'Click "NEW GAME" button and fill the number of rounds to start playing';
  }else if (Number(roundsLeft) == NaN){
    rounds.innerHTML = 'You have to put in the correct number of games to start playing';
  } else if(Number(roundsLeft) == 0){
    alert('Number of rounds must be higher then 0, please provide the number of rounds again');
    rounds.innerHTML = ' Press the "New Game" button to start the game';
  }else {
    roundsLeft = Number(roundsLeft);
  }
  
});