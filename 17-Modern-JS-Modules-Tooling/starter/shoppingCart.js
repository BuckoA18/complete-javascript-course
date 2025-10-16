// Exporting module
console.log("Exporting module");

const shipingCost = 10;
const cart = [];

export const addToCart = (object, quantity) => {
	cart.push({ object, quantity });
	console.log(`${quantity} ${object} was added to the cart`);
};
