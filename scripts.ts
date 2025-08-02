let humanScore: number = 0
let computerScore: number = 0

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

function getPlayerChoice(): Choice {
    let input = prompt('Choose between Rock, Paper or Scissors')
    const validPrompts: Choice[] = ['rock', 'paper', 'scissors']
    while (!input || !validPrompts.includes(input.toLowerCase() as Choice)) {
        console.log('The user canceled the prompt.')
        input = prompt('Choose between Rock, Paper or Scissors')
    }
    return input.toLowerCase() as Choice
}

function playRound(playerChoice: Choice, computerChoice: Choice): 'win' | 'loss' | 'draw' {
    if (playerChoice === 'rock' && computerChoice === 'scissors' || playerChoice === 'scissors' && computerChoice === 'paper' || playerChoice === 'paper' && computerChoice === 'rock') {
        humanScore++
        console.log(`You win this round! You played ${playerChoice} and the computer played ${computerChoice}`)
        return 'win'
    } else if (playerChoice === 'scissors' && computerChoice === 'rock' || playerChoice === 'paper' && computerChoice === 'scissors' || playerChoice === 'rock' && computerChoice === 'paper') {
        computerScore++
        console.log(`Computer won this round... You played ${playerChoice} and the computer played ${computerChoice}`)
        return 'loss'
    } else {
        return 'draw'
    }
}

function playGame() {
    let roundsPlayed: number = 0
    while (roundsPlayed < 5) {
        console.log(`Rounds Played ${roundsPlayed + 1}`)
        const playerChoice = getPlayerChoice()
        const computerChoice = getComputerChoice()
        const result = playRound(playerChoice, computerChoice)

        if (result != 'draw') {
            roundsPlayed++
        } else {
            console.log('It was a draw, let\'s go again!')
        }
    }

    if (humanScore > computerScore) {
        console.log('You won the game!')
    } else {
        console.log('You lost the game...')
    }
}

playGame()