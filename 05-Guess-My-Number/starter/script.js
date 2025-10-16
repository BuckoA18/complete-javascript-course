let score = 20;
let highscore = 20;
let initialScore = 20;

let randomNum;
function check() {
	const numberInputValue = parseInt(numberInput.value);
	if (numberInputValue === randomNum) {
		messageElement.innerText = "Correct!";
		highscore = score;
		highscoreElement.innerText = highscore;
	}
	if (numberInputValue < randomNum) {
		messageElement.innerText = "Too small";
		score--;
		scoreElement.innerText = `${score}`;
	}
	if (numberInputValue > randomNum) {
		messageElement.innerText = "Too large";
		score--;
		scoreElement.innerText = `${score}`;
	}
}

function getRandomNum() {
	randomNum = Math.floor(Math.random() * (21 - 1) + 1);
}

function reset() {
	numberElement.innerText = "?";
	numberInput.value = "";
	messageElement.innerText = "Start quessing...";
	scoreElement.innerText = initialScore;
	highscoreElement.innerText = highscore;
	score = initialScore;
	getRandomNum();
}

reset();

const resetButton = document.getElementById("reset-btn");
const checkButton = document.getElementById("check-btn");
const numberElement = document.getElementById("generated-number");
const numberInput = document.getElementById("guess-number");
const messageElement = document.getElementById("message");
const scoreElement = document.getElementById("score");
const highscoreElement = document.getElementById("highscore");

resetButton.addEventListener("click", reset);
checkButton.addEventListener("click", check);
