'use strict';
var output = document.getElementById('output');
var playerChoice;
var params = {
    roundsLeft: 0,
    roundsPlayed: 1,
    wins: 0,
    looses: 0,
    progress: [],
};
var clear = function(){
  params.roundsLeft = 0;
  params.roundsPlayed = 1;
  params.wins = 0;
  params.looses = 0;
  params.progress.length = 0;
};

// Check if there is a Winner

function checkWinner() {
    if (params.roundsLeft <= params.wins) {

        console.log(params);
        var progressHtml = '';
        for (var i = 0; i < params.progress.length; i++) {
          progressHtml += '<div>' + '<table>' + '<tr><th>' + 'Round:' + '</th>' + '' + '<th>' + 'Player chose:' + '</th>' + '' + '<th>'
          + 'Computer chose:' + '</th>' + '' + '<th>' + 'Player score' + '</th>' + '' + '<th>' + 'Computer score' + '</th></tr'
          + '<br>' + '<tr><td>' + params.progress[i].round + '</td>' + '<td>'  + params.progress[i].player + '</td>' + '<td>' + params.progress[i].computer
          + '</td>' + '<td>' + params.progress[i].playerScore + '</td>' + '<td>' + params.progress[i].compScore + '</td></table>' + '<br>'
          +  '<br><br>' + '</div>';
      }

        showModal();
        document.getElementById('content').innerHTML = 'You won the entire game!' + '<br>';
        document.getElementById('modalContent').innerHTML = '<br>' + progressHtml;
        clear();

    } else if (params.roundsLeft <= params.looses) {

        console.log(params);
        var progressHtml = '';
        for (var i = 0; i < params.progress.length; i++) {
          progressHtml += '<div>' + '<table>' + '<tr><th>' + 'Round:' + '</th>' + '' + '<th>' + 'Player chose:' + '</th>' + '' + '<th>'
          + 'Computer chose:' + '</th>' + '' + '<th>' + 'Player score' + '</th>' + '' + '<th>' + 'Computer score' + '</th></tr'
          + '<br>' + '<tr><td>' + params.progress[i].round + '</td>' + '<td>'  + params.progress[i].player + '</td>' + '<td>' + params.progress[i].computer
          + '</td>' + '<td>' + params.progress[i].playerScore + '</td>' + '<td>' + params.progress[i].compScore + '</td></table>' + '<br>'
          +  '<br><br>' + '</div>';
      }

        showModal();
        document.getElementById('content').innerHTML = 'You lost the entire game!' + '<br>';
        document.getElementById('modalContent').innerHTML = '<br>' + progressHtml;
        clear();
    }
}
// Attach player's choice to buttons

var choice = function(event) {
    event.preventDefault();
    var clickedElement = event.target;
    playerChoice = clickedElement.getAttribute('data-move')
    playerMove(playerChoice);
    params.roundsPlayed++;
};

var move = document.querySelectorAll('.player-move');
for (var i = 0; i < move.length; i++) {
    move[i].addEventListener('click', choice);
};

// Function which compares two choices

        var compare = function(choice1, choice2) {
            var p = {
                'rock': 'scissors',
                'scissors': 'paper',
                'paper': 'rock'
            }
            if (choice1 == choice2) {
                return '<br>' + 'It is a Tie!';
            } else if (p[choice1] == choice2) {
                params.wins++;
                checkWinner();
                return '<br>' + 'You won!';
            } else {
                params.looses++;
                checkWinner();
                return '<br>' + 'You lost!';
            }
        }

// Function triggered after choosing a button

var playerMove = function(playerChoice) {
    if (params.roundsLeft > 0) {

        if (playerChoice == 'rock' || playerChoice == 'paper' || playerChoice == 'scissors') {
            output.innerHTML = 'You played' + ' ' + playerChoice + ','
        };

// Computer's choice based on a random calculation

        var compChoice = Math.floor(Math.random() * 3 + 1);
        if (compChoice == 1) {
            compChoice = 'rock';
        } else if (compChoice == 2) {
            compChoice = 'paper';
        } else if (compChoice == 3) {
            compChoice = 'scissors';
        };

        output.innerHTML += ' ' + 'computer played' + ' ' + compChoice + '.';

    };

// Compare players' and computer's choices

    var winner = compare(playerChoice, compChoice);
    output.innerHTML += winner;
    document.getElementById('wins').innerHTML = params.wins;
    document.getElementById('looses').innerHTML = params.looses;

// Create an object to fill the "game over" modal

    var modalcontent = {
      round: params.roundsPlayed,
      player: playerChoice,
      computer: compChoice,
      playerScore: params.wins,
      compScore: params.looses,
    };

// Attach the data to the array after each round

     params.progress.push(modalcontent);

};

var newgame = document.getElementById('newgame');
var rounds = document.getElementById('rounds');

// "New game" button functionality

newgame.addEventListener('click', function() {

    params.roundsLeft = window.prompt('How many wins should finish the entire game?');
    rounds.innerHTML = params.roundsLeft + ' wins finishes the entire game';
    if (params.roundsLeft == null) {
        rounds.innerHTML = 'Click "NEW GAME" button and fill the number of rounds to start playing';
    } else if (Number(params.roundsLeft) == NaN) {
        rounds.innerHTML = 'You have to put in the correct number of games to start playing';
    } else if (Number(params.roundsLeft) == 0) {
        alert('Number of rounds must be higher then 0, please provide the number of rounds again');
        rounds.innerHTML = ' Press the "New Game" button to start the game';
    } else {
        params.roundsLeft = Number(params.roundsLeft);
    }

});

// Modals functionality

var showModal = function() {
    document.querySelector('#modal-overlay').classList.add('show');
    document.querySelector('.modal').classList.add('show');

};
var hideModal = function(event) {
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
    document.querySelector('.modal.show').classList.remove('show');
};
var closeButtons = document.querySelectorAll('.modal .close');

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', hideModal);
}

document.querySelector('#modal-overlay').addEventListener('click', hideModal);
