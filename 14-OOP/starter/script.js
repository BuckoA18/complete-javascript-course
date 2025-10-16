// class PersonCl {
// 	constructor(fullName, birthYear) {
// 		this.fullName = fullName;
// 		this.birthYear = birthYear;
// 	}

// 	calcAge() {
// 		console.log(2025 - this.birthYear);
// 	}

// 	get age() {
// 		return 2025 - this.birthYear;
// 	}

// 	set fullName(name) {
// 		if (name.includes(" ")) this._fullName = name;
// 		else alert("Incorect Format");
// 	}

// 	get fullName() {
// 		return this._fullName;
// 	}

// 	static hey() {
// 		return this._fullName;
// 	}
// }

// const jessica = new PersonCl("Jessica Davis", 1993);

////////////////////////////////

// function Person(firstName, birthYear) {
// 	this.firstName = firstName;
// 	this.birthYear = birthYear;
// }

// Person.prototype.calcAge = function () {
// 	console.log(2025 - this.birthYear);
// };

// function Student(firstName, birthYear, course) {
// 	Person.call(this, firstName, birthYear);
// 	this.course = course;
// }

// // Linking prototypes
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
// 	console.log(`My name is ${this.firstName} and i study ${this.course}`);
// };

// const mike = new Student("Mike", 2000, "CS");

//////////////////////////////

// function Car(brand, speed) {
// 	this.brand = brand;
// 	this.speed = speed;
// }

// Car.prototype.accelerate = function () {
// 	this.speed += 10;
// 	console.log(`${this.brand} is going ${this.speed} km/h`);
// };

// Car.prototype.brake = function () {
// 	this.speed -= 5;
// 	console.log(`${this.brand} is going ${this.speed} km/h`);
// };

// function EV(brand, speed, charge) {
// 	Car.call(this, brand, speed);
// 	this.charge = charge;
// }

// EV.prototype = Object.create(Car.prototype);

// EV.prototype.chargeBattery = function (chargeValue) {
// 	this.charge = chargeValue;
// };

// EV.prototype.accelerate = function () {
// 	this.speed += 20;
// 	this.charge -= 1;

// 	console.log(
// 		`${this.brand} is now going ${this.speed} km/h with charge of ${this.charge}`
// 	);
// };

// const tesla = new EV("Tesla", 140, 22);
// tesla.chargeBattery(90);
// console.log(tesla);

// class StudentCl extends PersonCl {
// 	constructor(fullName, birthYear, course) {
// 		super(fullName, birthYear);
// 		this.course = course;
// 		console.log(this);
// 	}

// 	introduce() {
// 		console.log(`My name is ${this.fullName} and i study ${this.course}`);
// 	}

// 	calcAge() {
// 		console.log(`I'm ${2025 - this.birthYear}`);
// 	}
// }

// const mark = new StudentCl("Mark Walter", 1993, "Computer science");

// mark.introduce();
// mark.calcAge();

// const PersonProto = {
// 	calcAge() {
// 		console.log(2025 - this.birthYear);
// 	},

// 	init(firstName, birthYear) {
// 		this.firstName = firstName;
// 		this.birthYear = birthYear;
// 	},
// };

// const steven = Object.create(PersonProto);
// steven.init("steven", 1995);
// console.log(steven);

// const StudentProto = Object.create(PersonProto);
// StudentProto.init = function (firstName, birthYear, course) {
// 	PersonProto.init.call(this, firstName, birthYear);
// 	this.course = course;
// };
// const jack = Object.create(StudentProto);
// jack.init("jack", 1299, "cs");
// console.log(jack);
// jack.calcAge();

// class Account {
// 	locale = navigator.language;
// 	bank = "Bankist";
// 	#movements = [];
// 	#pin;
// 	constructor(owner, currency, pin) {
// 		this.owner = owner;
// 		this.currency = currency;
// 		this.#pin = pin;
// 		// this.movements = [];
// 		// this.locale = navigator.language;
// 	}

// 	getMovements() {
// 		console.log(this.#movements);
// 		return this;
// 	}

// 	deposit(val) {
// 		this.#movements.push(val);
// 		return this;
// 	}

// 	withdrawal(val) {
// 		this.deposit(-val);
// 		return this;
// 	}

// 	#approveLoan(val) {
// 		return true;
// 	}

// 	requestLoan(val) {
// 		if (this.#approveLoan(val)) {
// 			this.deposit(val);
// 		}
// 		return this;
// 	}
// }

// const acc1 = new Account("Jonas", "EUR", 1111);

// acc1
// 	.deposit(300)
// 	.withdrawal(100)
// 	.withdrawal(50)
// 	.requestLoan(25000)
// 	// .getMovements()
// 	.withdrawal(5000);

// console.log(acc1);

class CarCl {
	constructor(brand, speed) {
		this.brand = brand;
		this.speed = speed;
	}

	accelerate() {
		this.speed += 10;
		console.log(`You are going ${this.speed} km/h`);
	}

	brake() {
		this.speed -= 5;
		console.log(`You are going ${this.speed} km/h`);
		return this;
	}
}

class EvCl extends CarCl {
	#charge;

	constructor(brand, speed, charge) {
		super(brand, speed);
		this.#charge = charge;
	}

	chargeBattery(chargeTo) {
		this.#charge = chargeTo;
		console.log(`Battery is now charged to ${this.#charge}%`);
		return this;
	}

	accelerate() {
		this.speed += 20;
		this.#charge -= 1;
		console.log(
			`${this.brand} is now going ${this.speed} with ${this.#charge}% left`
		);
		return this;
	}
}

const tesla = new EvCl("Tesla", 140, 77);
tesla.chargeBattery(50);
tesla.accelerate().accelerate().brake().accelerate().chargeBattery(100);
console.log(tesla);
