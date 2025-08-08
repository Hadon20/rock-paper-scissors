"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("./utils/helper");
console.log(helper_1.delay, helper_1.disableButtons);
let humanScore = 0;
let computerScore = 0;
let gameMessage = document.querySelector('#player-zone-title');
function getComputerChoice() {
    let computerChoice = Math.floor(Math.random() * 3);
    if (computerChoice === 0) {
        return 'rock';
    }
    else if (computerChoice === 1) {
        return 'paper';
    }
    else {
        return 'scissors';
    }
}
function getPlayerChoice() {
    return new Promise((resolve) => {
        const buttons = document.querySelectorAll('.button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const choice = button.querySelector('img').id;
                resolve(choice);
            }, { once: true });
        });
    });
}
function updateScore() {
    const pHumanScore = document.querySelector('.score-human');
    const pComputerScore = document.querySelector('.score-computer');
    pHumanScore.textContent = `You: ${humanScore}`;
    pComputerScore.textContent = `Computer: ${computerScore}`;
}
function updateRounds(roundsPlayed) {
    const pRounds = document.querySelector('.info-rounds');
    pRounds.textContent = `Rounds: ${roundsPlayed}`;
}
function updateGameBoard(playerChoice, computerChoice) {
    const divPlayerChoice = document.querySelector('.img-div-player');
    const divComputerChoice = document.querySelector('.img-div-computer');
    divPlayerChoice.querySelectorAll('img').forEach(img => img.remove());
    divComputerChoice.querySelectorAll('img').forEach(img => img.remove());
    const imgPlayerChoice = document.createElement('img');
    const imgComputerChoice = document.createElement('img');
    imgPlayerChoice.src = getImgPath(playerChoice);
    imgPlayerChoice.classList.add('img-choice');
    imgComputerChoice.src = getImgPath(computerChoice);
    imgComputerChoice.classList.add('img-choice');
    divPlayerChoice.append(imgPlayerChoice);
    divComputerChoice.append(imgComputerChoice);
}
function getImgPath(choice) {
    switch (choice) {
        case 'rock':
            return 'resources/rock-on-svgrepo-com.svg';
        case 'paper':
            return 'resources/paper-plane-svgrepo-com.svg';
        case 'scissors':
            return 'resources/scissors-svgrepo-com.svg';
    }
}
function playRound(playerChoice, computerChoice) {
    updateGameBoard(playerChoice, computerChoice);
    if (playerChoice === 'rock' && computerChoice === 'scissors' ||
        playerChoice === 'scissors' && computerChoice === 'paper' ||
        playerChoice === 'paper' && computerChoice === 'rock') {
        humanScore++;
        updateScore();
        return 'win';
    }
    else if (playerChoice === 'scissors' && computerChoice === 'rock' ||
        playerChoice === 'paper' && computerChoice === 'scissors' ||
        playerChoice === 'rock' && computerChoice === 'paper') {
        computerScore++;
        updateScore();
        return 'loss';
    }
    else {
        return 'draw';
    }
}
function playGame() {
    return __awaiter(this, void 0, void 0, function* () {
        let roundsPlayed = 0;
        gameMessage.textContent = 'Let the game begin!';
        (0, helper_1.disableButtons)(true);
        yield (0, helper_1.delay)(2500);
        while (roundsPlayed < 5) {
            updateRounds(roundsPlayed);
            gameMessage.textContent = 'Please make your choice';
            (0, helper_1.disableButtons)(false);
            const playerChoice = yield getPlayerChoice();
            (0, helper_1.disableButtons)(true);
            const computerChoice = getComputerChoice();
            const result = playRound(playerChoice, computerChoice);
            if (result != 'draw') {
                roundsPlayed++;
                if (result === 'win') {
                    gameMessage.textContent = 'You won this round!';
                }
                else {
                    gameMessage.textContent = 'You lost this round...';
                }
            }
            else {
                gameMessage.textContent = 'It was a draw, let\'s go again!';
            }
            yield (0, helper_1.delay)(2500);
        }
        updateRounds(roundsPlayed);
        if (humanScore > computerScore) {
            gameMessage.textContent = 'You won the game!';
        }
        else {
            gameMessage.textContent = 'You lost the game...';
        }
    });
}
playGame();
