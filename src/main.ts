import { delay, disableButtons } from "./utils/helper.js"

console.log(delay, disableButtons)

let humanScore: number = 0
let computerScore: number = 0
let gameMessage = document.querySelector('#player-zone-title') as HTMLParagraphElement

type Choice = 'rock' | 'paper' | 'scissors';

function getComputerChoice(): Choice {
    let computerChoice: number = Math.floor(Math.random() * 3)
    if (computerChoice === 0) {
        return 'rock'
    } else if (computerChoice === 1) {
        return 'paper'
    } else {
        return 'scissors'
    }
}

function getPlayerChoice(): Promise<Choice> {
    return new Promise((resolve) => {
        const buttons = document.querySelectorAll('.button') as NodeListOf<HTMLButtonElement>
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const choice = (button.querySelector('img') as HTMLImageElement).id as Choice
                resolve(choice)
            }, { once: true })
        })
    })
}

function updateScore() {
    const pHumanScore = document.querySelector('.score-human') as HTMLParagraphElement
    const pComputerScore = document.querySelector('.score-computer') as HTMLParagraphElement
    pHumanScore.textContent = `You: ${humanScore}`
    pComputerScore.textContent = `Computer: ${computerScore}`
}

function updateRounds(roundsPlayed: number) {
    const pRounds = document.querySelector('.info-rounds') as HTMLParagraphElement
    pRounds.textContent = `Rounds: ${roundsPlayed}`
}

function updateGameBoard(playerChoice: Choice, computerChoice: Choice) {
    const divPlayerChoice = document.querySelector('.img-div-player') as HTMLDivElement
    const divComputerChoice = document.querySelector('.img-div-computer') as HTMLDivElement

    divPlayerChoice.querySelectorAll('img').forEach(img => img.remove())
    divComputerChoice.querySelectorAll('img').forEach(img => img.remove())

    const imgPlayerChoice = document.createElement('img')
    const imgComputerChoice = document.createElement('img')

    imgPlayerChoice.src = getImgPath(playerChoice)
    imgPlayerChoice.classList.add('img-choice')
    imgComputerChoice.src = getImgPath(computerChoice)
    imgComputerChoice.classList.add('img-choice')

    divPlayerChoice.append(imgPlayerChoice)
    divComputerChoice.append(imgComputerChoice)
}

function getImgPath(choice: Choice) {

    switch (choice) {
        case 'rock':
            return '/public/resources/rock-on-svgrepo-com.svg'
        case 'paper':
            return '/public/resources/paper-plane-svgrepo-com.svg'
        case 'scissors':
            return '/public/resources/scissors-svgrepo-com.svg'
    }
}


function playRound(playerChoice: Choice, computerChoice: Choice): 'win' | 'loss' | 'draw' {

    updateGameBoard(playerChoice, computerChoice)

    if (playerChoice === 'rock' && computerChoice === 'scissors' ||
        playerChoice === 'scissors' && computerChoice === 'paper' ||
        playerChoice === 'paper' && computerChoice === 'rock') {
        humanScore++
        updateScore()
        return 'win'

    } else if (playerChoice === 'scissors' && computerChoice === 'rock' ||
        playerChoice === 'paper' && computerChoice === 'scissors' ||
        playerChoice === 'rock' && computerChoice === 'paper') {
        computerScore++
        updateScore()
        return 'loss'

    } else {
        return 'draw'
    }
}

async function playGame() {
    let roundsPlayed: number = 0
    gameMessage.textContent = 'Let the game begin!'
    disableButtons(true)
    await delay(2500)

    while (roundsPlayed < 5) {

        updateRounds(roundsPlayed)
        gameMessage.textContent = 'Please make your choice'
        disableButtons(false)
        const playerChoice = await getPlayerChoice()
        disableButtons(true)
        const computerChoice = getComputerChoice()
        const result = playRound(playerChoice, computerChoice)

        if (result != 'draw') {
            roundsPlayed++
            if (result === 'win') {
                gameMessage.textContent = 'You won this round!'
            } else {
                gameMessage.textContent = 'You lost this round...'
            }
        } else {
            gameMessage.textContent = 'It was a draw, let\'s go again!'
        }

        await delay(2500)
    }

    updateRounds(roundsPlayed)

    if (humanScore > computerScore) {
        gameMessage.textContent = 'You won the game!'
    } else {
        gameMessage.textContent = 'You lost the game...'
    }
}

playGame()