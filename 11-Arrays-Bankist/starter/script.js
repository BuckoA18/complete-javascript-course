// Data
const account1 = {
	owner: "Jonas Schmedtmann",
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
};

const account2 = {
	owner: "Jessica Davis",
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
};

const account3 = {
	owner: "Steven Thomas Williams",
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
};

const account4 = {
	owner: "Sarah Smith",
	movements: [430, 1000, 700, 50, 90, -400],
	interestRate: 1,
	pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = (movements, sort = false) => {
	containerMovements.innerHTML = " ";

	const movementsSort = sort
		? movements.slice().sort((a, b) => a - b)
		: movements;
	movementsSort.forEach((movement, index) => {
		const type = movement > 0 ? "deposit" : "withdrawal";

		const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">
         ${index + 1} ${type}</div>
          <div class="movements__value">${movement}</div>
        </div>
    `;

		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
};

const calcSummary = (account) => {
	const incomes = account.movements
		.filter((movement) => movement > 0)
		.reduce((acc, currentValue) => acc + currentValue);
	labelSumIn.textContent = `${incomes} EUR`;

	const outcomes = account.movements
		.filter((movement) => movement < 0)
		.reduce((acc, currentValue) => acc + currentValue);
	labelSumOut.textContent = `${Math.abs(outcomes)} EUR`;

	const interest = account.movements
		.filter((movement) => movement > 0)
		.map((deposit) => (deposit * account.interestRate) / 100)
		.filter((interest) => interest > 1)
		.reduce((acc, currentValue) => acc + currentValue);
	labelSumInterest.textContent = `${interest} EUR`;
};

const calcBalance = (account) => {
	account.balance = account.movements.reduce(
		(acc, currValue) => acc + currValue
	);
	labelBalance.textContent = `${account.balance} EUR`;
	console.log(account.balance);
};

const getUsername = (accs) => {
	accs.forEach((account) => {
		account.username = account.owner
			.toLowerCase()
			.split(" ")
			.map((name) => name[0])
			.join("");
	});
};
getUsername(accounts);

const updateUI = () => {
	displayMovements(loggedUser.movements);
	calcBalance(loggedUser);
	calcSummary(loggedUser);
};

//Event handlers
let loggedUser;

btnLogin.addEventListener("click", (e) => {
	e.preventDefault();

	loggedUser = accounts.find(
		(account) => account.username === inputLoginUsername.value
	);

	if (loggedUser?.pin != inputLoginPin.value)
		return alert("Incorect username or pin");
	console.log(loggedUser);

	labelWelcome.textContent = `Welcome back ${loggedUser.owner.split(" ")[0]}`;
	containerApp.style.opacity = 100;

	inputLoginUsername.value = inputLoginPin.value = "";
	inputLoginPin.blur();

	updateUI();
});

btnTransfer.addEventListener("click", (e) => {
	e.preventDefault();

	const amount = Number(inputTransferAmount.value);
	const recieverAccount = accounts.find(
		(account) => account.username === inputTransferTo.value
	);

	//Checking for balance and negative amount in transfer
	if (
		amount < 0 ||
		amount > loggedUser.balance ||
		recieverAccount?.username === loggedUser.username
	)
		return alert("Operation failed.. check your balance and amount");

	if (recieverAccount) {
		loggedUser.movements.push(-amount);
		recieverAccount.movements.push(amount);
	}

	inputTransferAmount.value = inputTransferTo.value = "";

	updateUI();

	console.log("current user: ", loggedUser);
	console.log("recieving user: ", recieverAccount, amount);
});

btnClose.addEventListener("click", (e) => {
	e.preventDefault();

	//Check the username and pin
	if (
		inputCloseUsername.value !== loggedUser.username ||
		Number(inputClosePin.value) !== loggedUser.pin
	)
		return alert("Incorrect username or pin..");

	const index = accounts.findIndex(
		(account) => account.username === inputCloseUsername
	);

	accounts.splice(index, 1);

	inputCloseUsername.value = inputClosePin.value = "";

	containerApp.style.opacity = 0;
});

btnLoan.addEventListener("click", (e) => {
	e.preventDefault();

	const amount = Number(inputLoanAmount.value);

	if (
		amount < 0 ||
		loggedUser.movements.some((movement) => movement >= amount * 0.1)
	)
		return alert("Invalid request");

	loggedUser.movements.push(amount);
	inputLoanAmount.value = "";

	updateUI();
});

let sortState = false;
btnSort.addEventListener("click", (e) => {
	e.preventDefault();

	displayMovements(loggedUser.movements, !sortState);
	sortState = !sortState;
});

// console.log(accounts);

//////////////////////////////////////////////////////////

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements);

const groupedMovements = Object.groupBy(movements, (movement) =>
	movement > 0 ? "deposits" : "withdrawal"
);

console.log(groupedMovements);

const movementsUI = Array.from(document.querySelectorAll(".movements"));
console.log(movementsUI);
