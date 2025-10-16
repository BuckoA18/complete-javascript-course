const scoreElement0 = document.getElementById("score--0");
const scoreElement1 = document.getElementById("score--1");
const currentScoreElement0 = document.getElementById("current--0");
const currentScoreElement1 = document.getElementById("current--1");
const diceElement = document.querySelector(".dice");
const newGameButton = document.querySelector(".btn--new");
const rollDiceButton = document.querySelector(".btn--roll");
const holdButton = document.querySelector(".btn--hold");
const playerSectionElement0 = document.querySelector(".player--0");
const playerSectionElement1 = document.querySelector(".player--1");

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

const newGame = () => {
	scores = [0, 0];
	scoreElement0.textContent = 0;
	scoreElement1.textContent = 0;
	currentScoreElement0.textContent = 0;
	playerSectionElement0.classList.remove("player--winner");
	currentScoreElement1.textContent = 0;
	playerSectionElement1.classList.remove("player--winner");
	activePlayer = 0;
	playerSectionElement0.classList.add("player--active");
	playerSectionElement1.classList.remove("player--active");
	diceElement.classList.add("hidden");

	rollDiceButton.addEventListener("click", diceRoll);
	holdButton.addEventListener("click", hold);
};

const diceRoll = () => {
	console.log(scores);
	const diceNum = Math.floor(Math.random() * (6 - 1 + 1) + 1);
	console.log(`current roll = ${diceNum}`);

	diceElement.classList.remove("hidden");
	diceElement.src = `dice-${diceNum}.png`;

	if (diceNum !== 1) {
		currentScore += diceNum;
		document.getElementById(`current--${activePlayer}`).textContent =
			currentScore;
		return;
	}
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	switchPlayer();
};

const switchPlayer = () => {
	currentScore = 0;
	activePlayer = activePlayer === 0 ? 1 : 0;
	playerSectionElement0.classList.toggle("player--active");
	playerSectionElement1.classList.toggle("player--active");
};

const hold = () => {
	scores[activePlayer] += currentScore;
	scoreElement0.textContent = scores[0];
	scoreElement1.textContent = scores[1];
	checkScore();
	switchPlayer();
};

const checkScore = () => {
	if (scores[activePlayer] >= 20) {
		document
			.querySelector(`.player--${activePlayer}`)
			.classList.add("player--winner");
		rollDiceButton.removeEventListener("click", diceRoll);
		holdButton.removeEventListener("click", hold);
		diceElement.classList.add("hidden");
	}
};

newGame();
newGameButton.addEventListener("click", newGame);
