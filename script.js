let player1Name = '';
let player2Name = '';
let player1Score = 0;
let player2Score = 0;
let currentPlayer = 1;
let myNumber = Math.floor(Math.random() * 100);
let attempts = 0;

function startGame() {
    player1Name = document.getElementById('player1Name').value.trim() || 'Player 1';
    player2Name = document.getElementById('player2Name').value.trim() || 'Player 2';
    
    document.getElementById('gameRules').style.display = 'block';
    document.getElementById('gameBox').style.display = 'block';
    document.getElementById('playerTurn').textContent = `${player1Name}'s Turn`;
    document.querySelector('.name-input-section').style.display = 'none';
}

// Function to handle guessing
function guessNumber() {
    const userInput = document.getElementById('userInput').value;
    const feedbackElement = document.getElementById('feedback');

    if (userInput === '') {
        feedbackElement.textContent = "Please enter a number!";
        feedbackElement.style.color = '#ffeb3b';
        return;
    }

    const userNumber = parseInt(userInput);

    if (isNaN(userNumber) || userNumber < 0 || userNumber > 100) {
        feedbackElement.textContent = "Please enter a valid number between 0 and 100.";
        feedbackElement.style.color = '#f44336';
        shakeBox();
        return;
    }

    attempts++;
    if (userNumber === myNumber) {
        feedbackElement.textContent = `🎉 ${currentPlayer === 1 ? player1Name : player2Name} guessed the number ${myNumber} correctly!`;
        feedbackElement.style.color = '#00e676';
        pulseBox();

        if (currentPlayer === 1) {
            player1Score++;
            document.getElementById('player1Score').textContent = `${player1Name} Score: ${player1Score}`;
        } else {
            player2Score++;
            document.getElementById('player2Score').textContent = `${player2Name} Score: ${player2Score}`;
        }

        if (player1Score === 5 || player2Score === 5) {
            declareWinner();
            return;
        }

        myNumber = Math.floor(Math.random() * 100);
        switchPlayer();
    } else if (userNumber > myNumber) {
        feedbackElement.textContent = "⬆️ Your guess is too high. Try again.";
        feedbackElement.style.color = '#ffeb3b';
        shakeBox();
        switchPlayer();
    } else {
        feedbackElement.textContent = "⬇️ Your guess is too low. Try again.";
        feedbackElement.style.color = '#ffeb3b';
        shakeBox();
        switchPlayer();
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById('playerTurn').textContent = `${currentPlayer === 1 ? player1Name : player2Name}'s Turn`;
    document.getElementById('userInput').value = '';
}

function declareWinner() {
    const feedbackElement = document.getElementById('feedback');
    if (player1Score === 5) {
        feedbackElement.textContent = `🏆 ${player1Name} wins the game! Congratulations! 🎉`;
    } else {
        feedbackElement.textContent = `🏆 ${player2Name} wins the game! Congratulations! 🎉`;
    }
    document.getElementById('resetButton').style.display = 'inline';
    document.getElementById('userInput').disabled = true;
}

function resetGame() {
    myNumber = Math.floor(Math.random() * 100);
    attempts = 0;
    player1Score = 0;
    player2Score = 0;
    currentPlayer = 1;

    document.getElementById('player1Score').textContent = `${player1Name} Score: ${player1Score}`;
    document.getElementById('player2Score').textContent = `${player2Name} Score: ${player2Score}`;
    document.getElementById('playerTurn').textContent = `${player1Name}'s Turn`;
    document.getElementById('feedback').textContent = '';
    document.getElementById('resetButton').style.display = 'none';
    document.getElementById('userInput').disabled = false;
}

function shakeBox() {
    const gameBox = document.querySelector('.game-box');
    gameBox.classList.add('shake');
    setTimeout(() => {
        gameBox.classList.remove('shake');
    }, 500);
}

function pulseBox() {
    const gameBox = document.querySelector('.game-box');
    gameBox.classList.add('pulse');
    setTimeout(() => {
        gameBox.classList.remove('pulse');
    }, 500);
}
