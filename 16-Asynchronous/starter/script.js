const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal
//  https://www.apicountries.com/countries

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////

const renderCountry = (data, className = "") => {
	const html = `
     <article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${Object.values(data.name)[0]}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
							+data.population / 1000000
						).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${
							Object.values(data.languages)[0]
						}</p>
            <p class="country__row"><span>💰</span>${
							Object.values(data.currencies)[0].name
						}</p>
          </div>
        </article>`;

	countriesContainer.insertAdjacentHTML("beforeend", html);
	countriesContainer.style.opacity = "100";
};

// const renderError = (msg) => {
// 	countriesContainer.insertAdjacentText("beforeend", msg);
// };

// const getCountryAndNeighbour = (country) => {
// 	// Ajax call country 1
// 	const request = new XMLHttpRequest();
// 	request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
// 	request.send();

// 	request.addEventListener("load", () => {
// 		const [data] = JSON.parse(request.responseText);
// 		console.log("Country: ", data);

// 		// Render country 1
// 		renderCountry(data);

// 		// Get neighbour country
// 		const neighbour = data.borders?.[0].toLowerCase();
// 		console.log(neighbour);

// 		// Ajax call country 2
// 		const request2 = new XMLHttpRequest();
// 		request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbour}`);
// 		request2.send();

// 		request2.addEventListener("load", () => {
// 			const [data2] = JSON.parse(request2.responseText);
// 			console.log("Country: ", data2);
// 			renderCountry(data2, "neighbour");
// 		});
// 	});
// };

// getCountryAndNeighbour("mexico");

////////////////////////////////////////////////

// const getCountryData = (country) => {
// 	fetch(`https://restcountries.com/v2/name/${country}`)
// 		.then((response) => {
// 			console.log(response);
// 			return response.json();
// 		})
// 		.then((data) => {
// 			console.log(...data);
// 			renderCountry(...data);
// 		});
// };
// const getJSON = (url, errorMsg) => {
// 	return fetch(url).then((response) => {
// 		if (!response.ok) throw new Error(errorMsg);
// 		return response.json();
// 	});
// };
// const getCountryData = (country) => {
// 	// Country 1
// 	getJSON(`https://restcountries.com/v3.1/name/${country}`, "Country not found")
// 		.then((data) => {
// 			renderCountry(data[0]);
// 			const neighbour = data[0].borders?.[0];
// 			console.log(neighbour);

// 			// Country 2
// 			return getJSON(
// 				`https://restcountries.com/v3.1/alpha/${neighbour}`,
// 				"Country not found"
// 			);
// 		})
// 		.then((data) => {
// 			renderCountry(data[0], "neighbour");
// 		})
// 		.catch((error) => {
// 			console.log(error);
// 			renderError(`Somethink went wrong: ${error.message}`);
// 		})
// 		.finally(() => {
// 			countriesContainer.style.opacity = "100";
// 		});
// };

// btn.addEventListener("click", () => {
// 	getCountryData("dsds");
// });

// const fetchCountry = (url, errorMsg) => {
// 	return fetch(url).then((response) => {
// 		if (!response.ok) throw new Error(errorMsg);
// 		return response.json();
// 	});
// };

// const whereAmI = (lat, lng) => {
// 	fetchCountry(
// 		`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`,
// 		"Country not found"
// 	)
// 		.then((data) => {
// 			console.log(data);
// 			console.log(`You are in ${data.city}, ${data.countryName}.`);
// 			const country = data.countryName;

// 			return fetchCountry(
// 				`https://restcountries.com/v3.1/name/${country}`,
// 				"Country not found"
// 			).then((data) => {
// 				console.log(data);

// 				renderCountry(data[0]);
// 			});
// 		})

// 		.catch((err) => {
// 			console.log("Error:", err);
// 		});
// };

// whereAmI(52, 13);
// whereAmI(19.037, 72.873);
// whereAmI(-33, 18);

// const lotteryPromise = new Promise((resolve, reject) => {
// 	if (Math.random() >= 0.5) {
// 		resolve("You win");
// 	} else {
// 		reject("You lost");
// 	}
// });

// lotteryPromise
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => console.log(err));

// const wait = (secs) => {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, secs * 1000);
// 	});
// };

// wait(2)
// 	.then(() => {
// 		console.log("i waited for 2 seconds");
// 		return wait(1);
// 	})
// 	.then(() => {
// 		console.log("i waited 1 second");
// 	});

// Promise.resolve("abc").then((res) => {
// 	console.log(res);
// });

// const whereAmI = () => {
// 	getPosition()
// 		.then((pos) => {
// 			const { latitude, longitude } = pos.coords;
// 			return fetch(
// 				`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
// 			);
// 		})

// 		.then((response) => {
// 			if (!response.ok) throw new Error("Could not get the position");
// 			return response.json();
// 		})
// 		.then((data) => {
// 			console.log(data);
// 			console.log(`You are in ${data.city}, ${data.countryName}.`);
// 			const country = data.countryName;

// 			return fetch(`https://restcountries.com/v3.1/name/${country}`)
// 				.then((response) => {
// 					if (!response.ok) throw new Error("Could not get the position data");
// 					return response.json();
// 				})
// 				.then((data) => {
// 					console.log(data);

// 					renderCountry(data[0]);
// 				});
// 		})

// 		.catch((err) => {
// 			console.log("Error:", err);
// 		});
// };

// whereAmI();

// const imageContainer = document.querySelector(".images");

// const createImg = (imgPath) => {
// 	return new Promise((resolve, reject) => {
// 		const img = document.createElement("img");
// 		img.src = imgPath;

// 		img.addEventListener("load", () => {
// 			imageContainer.append(img);
// 			resolve(img);
// 		});

// 		img.addEventListener("error", () => {
// 			reject(new Error("Invalid url"));
// 		});
// 	});
// };

// let currentImg;

// createImg("img/img-1.jpg")
// 	.then((img) => {
// 		currentImg = img;
// 		return wait(2);
// 	})
// 	.then(() => {
// 		currentImg.style.display = "none";
// 		return createImg("img/img-2.jpg");
// 	})
// 	.then((img) => {
// 		currentImg = img;
// 		return wait(2);
// 	})
// 	.then(() => {
// 		currentImg.style.display = "none";
// 		return createImg("img/img-3.jpg");
// 	})

// 	.catch((err) => console.error(err));

// const getPosition = () => {
// 	return new Promise((resolve, reject) => {
// 		navigator.geolocation.getCurrentPosition(resolve, reject);
// 	});
// };

// const whereAmI = async () => {
// 	try {
// 		const position = await getPosition();
// 		const { latitude, longitude } = position.coords;

// 		const responseGeo = await fetch(
// 			`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}`
// 		);

// 		if (!responseGeo.ok) throw new Error("Failed to fetch data");
// 		const geoData = await responseGeo.json();
// 		const country = geoData.countryName.toLowerCase();

// 		const response = await fetch(
// 			`https://restcountries.com/v3.1/name/${country}`
// 		);
// 		if (!response.ok) throw new Error("Failed to fetch data");
// 		const data = await response.json();
// 		renderCountry(data[0]);

// 		return `You are in ${geoData.city}, ${geoData.country}`;
// 	} catch (err) {
// 		console.error(err.message);

// 		throw err;
// 	}
// };

// (async function () {
// 	try {
// 		const city = await whereAmI();
// 		console.log(city);
// 	} catch (err) {
// 		console.error(err);
// 	}
// })();

// const get3Countries = async (country1, country2, country3) => {
// 	try {
// 		// const [data1] = await getJSON(
// 	`https://restcountries.com/v2/name/${country1}`,
// 	"Failed to fetch data"
// );

// const [data2] = await getJSON(
// 	`https://restcountries.com/v2/name/${country2}`,
// 	"Failed to fetch data"
// );

// const [data3] = await getJSON(
// 	`https://restcountries.com/v2/name/${country3}`,
// 	"Failed to fetch data"
// );

// 		const data = await Promise.all([
// 			getJSON(
// 				`https://restcountries.com/v2/name/${country1}`,
// 				"Failed to fetch data"
// 			),
// 			getJSON(
// 				`https://restcountries.com/v2/name/${country2}`,
// 				"Failed to fetch data"
// 			),
// 			getJSON(
// 				`https://restcountries.com/v2/name/${country3}`,
// 				"Failed to fetch data"
// 			),
// 		]);

// 		console.log(data);
// 		data.forEach((country) => console.log(country[0].capital));
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

// get3Countries("portugal", "germany", "poland");

// const timeout = (s) => {
// 	return new Promise((_, reject) => {
// 		setTimeout(() => {
// 			reject(new Error("Request took too long"));
// 		}, s * 1000);
// 	});
// };

// const getFastest = async () => {
// 	try {
// 		const data = await Promise.race([
// 			getJSON(`https://restcountries.com/v2/name/mexico`),
// 			getJSON(`https://restcountries.com/v2/name/poland`),
// 			getJSON(`https://restcountries.com/v2/name/germany`),
// 			timeout(0.1),
// 		]);
// 		console.log(data[0]);
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

// getFastest();

// const imagesContainer = document.querySelector(".images");

// const loadImage = async (imgPath) => {
// 	return new Promise((resolve, reject) => {
// 		const img = document.createElement("img");
// 		img.src = imgPath;

// 		img.addEventListener("load", () => {
// 			imagesContainer.append(img);
// 			resolve(img);
// 		});

// 		img.addEventListener("error", () => {
// 			reject(new Error("Incorrect image path"));
// 		});
// 	});
// };

// const wait = async (s) => {
// 	return new Promise((resolve) => {
// 		setTimeout(resolve, s * 1000);
// 	});
// };

// const loadAndWait = async () => {
// 	try {
// 		const imgPaths = ["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"];

// 		for (const path of imgPaths) {
// 			const img = await loadImage(path);
// 			await wait(2);
// 			img.style.display = "none";
// 		}
// 	} catch (err) {
// 		console.error(err);
// 	}
// };
// loadAndWait();

// const loadAll = async (array) => {
// 	try {
// 		const imgs = array.map((path) => loadImage(path));
// 		console.log(imgs);

// 		const data = await Promise.all(imgs);
// 		console.log(data);

// 		data.forEach((img) => img.classList.add("parallel"));
// 	} catch (err) {
// 		console.error(err);
// 	}
// };

// loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
