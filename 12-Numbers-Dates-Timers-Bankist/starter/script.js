/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
	owner: "Jonas Schmedtmann",
	movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
	interestRate: 1.2, // %
	pin: 1111,

	movementsDates: [
		"2019-11-18T21:31:17.178Z",
		"2019-12-23T07:42:02.383Z",
		"2020-01-28T09:15:04.904Z",
		"2020-10-13T10:17:24.185Z",
		"2020-05-08T14:11:59.604Z",
		"2025-10-15T17:01:17.194Z",
		"2025-09-15T06:36:17.929Z",
		"2025-09-16T10:51:36.790Z",
	],
	currency: "EUR",
	locale: "pt-PT", // de-DE
};

const account2 = {
	owner: "Jessica Davis",
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,

	movementsDates: [
		"2019-11-01T13:15:33.035Z",
		"2019-11-30T09:48:16.867Z",
		"2019-12-25T06:04:23.907Z",
		"2020-01-25T14:18:46.235Z",
		"2020-02-05T16:33:06.386Z",
		"2020-04-10T14:43:26.374Z",
		"2020-06-25T18:49:59.371Z",
		"2020-07-26T12:01:20.894Z",
	],
	currency: "USD",
	locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = (date, locale) => {
	const calcDaysPasseed = (date1, date2) => {
		return Math.floor(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
	};
	const daysPassed = calcDaysPasseed(new Date(), date);
	console.log(daysPassed);

	if (daysPassed === 0) return "Today";
	if (daysPassed === 1) return "Yesterday";
	if (daysPassed <= 7) return `${daysPassed} days ago`;

	return new Intl.DateTimeFormat(locale).format();
};

const formatCurrency = (value, locale, currency) => {
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency: currency,
	}).format(value);
};

const displayMovements = (user, sort = false) => {
	containerMovements.innerHTML = " ";

	const combinedMovementsAndDates = user.movements.map((movement, index) => {
		return { movement: movement, movementDate: user.movementsDates.at(index) };
	});
	console.log(combinedMovementsAndDates);

	if (sort) combinedMovementsAndDates.sort((a, b) => a.movement - b.movement);

	combinedMovementsAndDates.forEach((obj, index) => {
		const { movement, movementDate } = obj;
		const type = movement > 0 ? "deposit" : "withdrawal";

		const date = new Date(movementDate);
		const displayDate = formatMovementDate(date);

		const formatedMovement = formatCurrency(
			movement,
			user.locale,
			user.currency
		);

		const html = `
     <div class="movements__row">
          <div class="movements__type movements__type--${type}">
         ${index + 1} ${type}</div>
          <div class="movements__date">${displayDate} </div>
           <div class="movements__value">${formatedMovement}</div>
        </div>
    `;

		containerMovements.insertAdjacentHTML("afterbegin", html);
	});
};

const calcSummary = (account) => {
	const incomes = account.movements
		.filter((movement) => movement > 0)
		.reduce((acc, currentValue) => acc + currentValue);
	labelSumIn.textContent = formatCurrency(
		incomes,
		account.locale,
		account.currency
	);

	const outcomes = account.movements
		.filter((movement) => movement < 0)
		.reduce((acc, currentValue) => acc + currentValue);
	labelSumOut.textContent = formatCurrency(
		outcomes,
		account.locale,
		account.currency
	);

	const interest = account.movements
		.filter((movement) => movement > 0)
		.map((deposit) => (deposit * account.interestRate) / 100)
		.filter((interest) => interest > 1)
		.reduce((acc, currentValue) => acc + currentValue);
	labelSumInterest.textContent = formatCurrency(
		interest,
		account.locale,
		account.currency
	);
};

const calcBalance = (account) => {
	account.balance = account.movements.reduce(
		(acc, currValue) => acc + currValue
	);
	labelBalance.textContent = formatCurrency(
		account.balance,
		account.locale,
		account.currency
	);
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
	displayMovements(loggedUser);
	calcBalance(loggedUser);
	calcSummary(loggedUser);

	clearInterval(logoutTimer);
	logoutTimer = startLogoutTimer();
};

const startLogoutTimer = () => {
	const startTime = 60;
	let time = startTime;
	const tick = () => {
		const min = `${Math.trunc(time / 60)}`.padStart(2, "0");
		const secs = `${time % 60}`.padStart(2, "0");
		labelTimer.textContent = `${min}:${secs}`;

		if (time === 0) {
			clearInterval(logoutTimer);
			labelWelcome.textContent = "Log in to get started";
			containerApp.style.opacity = 0;
		}

		time--;
	};
	tick();
	const logoutTimer = setInterval(tick, 1000);

	return logoutTimer;
};

//Event handlers
let loggedUser, logoutTimer;

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

	const dateNow = new Date();
	const options = {
		hour: "numeric",
		minute: "numeric",
		day: "numeric",
		month: "numeric",
		year: "numeric",
	};
	labelDate.textContent = new Intl.DateTimeFormat(
		loggedUser.locale,
		options
	).format(dateNow);

	if (logoutTimer) clearInterval(logoutTimer);
	logoutTimer = startLogoutTimer();

	updateUI();
});

btnTransfer.addEventListener("click", (e) => {
	e.preventDefault();

	const amount = +inputTransferAmount.value;
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

		// Adding current date
		loggedUser.movementsDates.push(new Date().toISOString());
		recieverAccount.movementsDates.push(new Date().toISOString());
	}

	inputTransferAmount.value = inputTransferTo.value = "";

	updateUI();
});

btnClose.addEventListener("click", (e) => {
	e.preventDefault();

	//Check the username and pin
	if (
		inputCloseUsername.value !== loggedUser.username ||
		+inputClosePin.value !== loggedUser.pin
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

	const amount = Math.floor(inputLoanAmount.value);

	if (
		amount > 0 &&
		loggedUser.movements.some((movement) => movement >= amount * 0.1)
	) {
		setTimeout(() => {
			loggedUser.movements.push(amount);
			loggedUser.movementsDates.push(new Date().toISOString());
			updateUI();
		}, 2000);
	} else {
		return alert("Invalid request");
	}
	inputLoanAmount.value = "";
});

let sortState = false;
btnSort.addEventListener("click", (e) => {
	e.preventDefault();

	displayMovements(loggedUser, !sortState);
	sortState = !sortState;
});

// console.log(accounts);

//////////////////////////////////////////////////////////
