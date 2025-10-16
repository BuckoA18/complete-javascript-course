// const firstName = "Antonin";

// function calcAge(birthYear) {
// 	const age = 2025 - birthYear;

// 	function printAge() {
// 		const output = `${firstName}, You are ${age} born in ${birthYear}`;
// 		console.log(output);
// 	}
// 	printAge();
// 	return age;
// }

// console.log(calcAge(2002));

// const antonin = {
// 	firstName: "Antonin",
// 	year: 1984,
// 	calcAge: function () {
// 		console.log(this);
// 		console.log(2025 - this.year);

// 		isMillenial = () => {
// 			console.log(this.year >= 1981 && this.year <= 1996);
// 		};
// 		isMillenial();
// 	},
// 	greet: function () {
// 		console.log(`Hey ${this.firstName}`);
// 	},
// };

// antonin.calcAge();
// antonin.greet();

const jessica1 = {
	firstName: "Jessica",
	lastName: "Williams",
	age: 27,
};

function merryPerson(originalPerson, newLastName) {
	originalPerson.lastName = newLastName;
	return originalPerson;
}

const marriedJessica = merryPerson(jessica1, "Davis");

// const marriedJessica = jessica;
// marriedJessica.lastName = "Davis";

// console.log("Jessica: ", jessica1);
// console.log("Married Jessica: ", marriedJessica);

const jessica = {
	firstName: "Jessica",
	lastName: "Williams",
	age: 27,
	family: ["Alice", "Bob"],
};

// const jessicaCopy = { ...jessica };
// jessicaCopy.lastName = "Davis";

// console.log(jessicaCopy);

const jesicaClone = structuredClone(jessica);

jesicaClone.family.push("Mary");
jesicaClone.family.push("John");

console.log("Original: ", jessica);
console.log("Clone: ", jesicaClone);
