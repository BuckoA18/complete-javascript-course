// Importing module

// const fetchData = async () => {
// 	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
// 	const data = await response.json();

// 	return {
// 		title: data.at(-1).title,
// 		text: data.at(-1).body,
// 	};
// };

// const lastPost = await fetchData();
// console.log(lastPost);

// const ShopingCart = (() => {
// 	const cart = [];
// 	const shipingCost = 10;
// 	const totalPrice = 237;
// 	const totalQuantitu = 23;

// 	const addToCart = (object, quantity) => {
// 		cart.push({ object, quantity });
// 		console.log(`${quantity} ${object} was added to the cart`);
// 	};

// 	return {
// 		addToCart,
// 		cart,
// 		totalPrice,
// 		totalQuantitu,
// 	};
// })();
