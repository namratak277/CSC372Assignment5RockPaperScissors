const imagePaths = {
    rock: "Images/rock.PNG",
    paper: "Images/paper.PNG",
    scissors: "Images/scissors.PNG",
    question: "Images/question-mark.PNG"
};
    let playerScore = 0;
    let computerScore = 0;
    const computerImage = document.getElementById("computer-choice");
    const resultText = document.getElementById("result");
    const playerScoreText = document.getElementById("player-score");
    const computerScoreText = document.getElementById("computer-score");
    const roundText = document.getElementById("round");
    const resetButton = document.getElementById("reset");

window.play = function (playerChoice) {
    highlightSelectedChoice(playerChoice);
    let shuffleChoices = ["rock", "paper", "scissors"];
    let shuffleIndex = 0;
    const shuffleInterval = setInterval(() => {
        const current = shuffleChoices[shuffleIndex % 3];
        computerImage.src = imagePaths[current];
        computerImage.alt = current;
        shuffleIndex++;
    }, 100);

    setTimeout(() => {
        clearInterval(shuffleInterval);
        const computerChoice = getComputerChoice();
        displayComputerChoice(computerChoice);
        const result = getResult(playerChoice, computerChoice);
        displayResult(result);

        computerImage.classList.add('selected');
        updateScores(result);
        updateScoreDisplay();
        updateRoundDisplay(playerChoice, computerChoice, result);
    }, 3000);
};

function highlightSelectedChoice(playerChoice) {
    const allChoices = document.querySelectorAll('.choice');
    allChoices.forEach(choice => {
        choice.classList.remove('selected');
    });

    const selectedImage = document.querySelector(`.choice[alt="${playerChoice}"]`);
    if (selectedImage) {
        selectedImage.classList.add('selected');
    }
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function displayComputerChoice(choice) {
    computerImage.src = imagePaths[choice];
    computerImage.alt = choice;
}

function getResult(player, computer) {
    if (player === computer) return "draw";
    if (
        (player === "rock" && computer === "scissors") ||
        (player === "paper" && computer === "rock") ||
        (player === "scissors" && computer === "paper")
    ) {return "win";}
    return "lose";
}

function displayResult(result) {
    if (result === "win") {
        resultText.textContent = "You Win!";
    } else if (result === "lose") {
        resultText.textContent = "You Lose!";
    } else {
        resultText.textContent = "It's a Draw!";}
}

function updateScores(result) {
     if (result === "win") { playerScore++;} 
     else if (result === "lose") {computerScore++;}
}

function updateScoreDisplay() {
    playerScoreText.textContent = playerScore;
    computerScoreText.textContent = computerScore;
}

resetButton.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    updateScoreDisplay();
    resultText.textContent = "";
    roundText.textContent = "";
    computerImage.src = imagePaths.question;
    computerImage.alt = "Computer's Choice";
//tried to deselect the highlighted image after reset but doesn't work yet
    document.querySelectorAll('.choice').forEach(choice => {
        choice.classList.remove('selected');
    });
    computerImage.classList.remove('selected');
}
);

