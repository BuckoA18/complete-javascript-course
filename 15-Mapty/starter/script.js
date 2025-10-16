"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

class Workout {
	date = new Date();
	id = Date.now().toString().slice(-10);
	clicks = 0;

	constructor(coords, distance, duration) {
		this.coords = coords; // [lat, lng]
		this.distance = distance; // km
		this.duration = duration; // min
	}

	_setDescription() {
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];

		this.description = `${this.type[0].toUpperCase() + this.type.slice(1)} on ${
			months[this.date.getMonth()]
		} ${this.date.getDate()}`;
		console.log(this.description);
	}
}

class Running extends Workout {
	type = "running";
	constructor(coords, distance, duration, cadence) {
		super(coords, distance, duration);
		this.cadence = cadence;
		this.calcPace();
		this._setDescription();
	}

	calcPace() {
		this.pace = this.duration / this.distance;
		return this.pace;
	}
}

class Cycling extends Workout {
	type = "cycling";
	constructor(coords, distance, duration, elevationGain) {
		super(coords, distance, duration);
		this.elevationGain = elevationGain;
		this.calcSpeed();
		this._setDescription();
	}

	calcSpeed() {
		this.speed = this.distance / (this.duration / 60);
		return this.speed;
	}
}

///////////////////////////////////////////////////////////////
// APLICATION ARCHITERCTURE

class App {
	#map;
	#mapZoomLvl = 13;
	#mapEvent;
	#workouts = [];

	constructor() {
		// Get users position
		this._getPosition();

		// Attach event handlers
		form.addEventListener("submit", this._newWorkout.bind(this));
		inputType.addEventListener("change", this._toggleelevationField.bind(this));
		containerWorkouts.addEventListener("click", this._moveToPopup.bind(this));

		// Get data from local storage
		this._getLocalStorage();
	}

	_getPosition() {
		navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), () => {
			alert("Could not get your position");
		});
	}

	_loadMap(position) {
		// console.log("position", position);
		const { latitude, longitude } = position.coords;

		const coords = [latitude, longitude];

		this.#map = L.map("map").setView(coords, this.#mapZoomLvl);

		L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
			attribution:
				'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
		}).addTo(this.#map);

		// Handling clicks on map
		this.#map.on("click", this._showForm.bind(this));

		this.#workouts.forEach((workout) => {
			this._renderWorkoutMarker(workout);
		});
	}

	_showForm(mapE) {
		this.#mapEvent = mapE;
		form.classList.remove("hidden");
		inputDistance.focus();
	}

	_hideForm() {
		inputDistance.value =
			inputCadence.value =
			inputElevation.value =
			inputDuration.value =
				" ";

		form.style.display = "none";
		form.classList.add("hidden");

		setTimeout(() => {
			form.style.display = "grid";
		}, 1000);
	}

	_toggleelevationField(e) {
		e.preventDefault();
		inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
		inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
	}

	_newWorkout(e) {
		const validInputs = (...inputs) =>
			inputs.every((input) => Number.isFinite(input));

		const allPositive = (...inputs) => inputs.every((input) => input > 0);
		e.preventDefault();

		//Get data from form
		const type = inputType.value;
		const distance = +inputDistance.value;
		const duration = +inputDuration.value;
		const { lat, lng } = this.#mapEvent.latlng;
		let workout;

		//If cycling create cycling object
		if (type === "cycling") {
			const elevationGain = +inputElevation.value;
			//Check if data valid
			if (
				!validInputs(distance, duration, elevationGain) ||
				!allPositive(distance, duration)
			)
				return alert("Invalid input");

			workout = new Cycling([lat, lng], distance, duration, elevationGain);
		}

		//If running create runnning object
		if (type === "running") {
			const cadence = +inputCadence.value;
			//Check if data valid
			if (
				!validInputs(distance, duration, cadence) ||
				!allPositive(distance, duration, cadence)
			)
				return alert("Invalid input");

			workout = new Running([lat, lng], distance, duration, cadence);
		}

		//add new object to workout array
		this.#workouts.push(workout);
		console.log(workout);

		//Render workout on map as marker
		this._renderWorkoutMarker(workout);

		//Render workout on the list
		this._renderWorkout(workout);

		//Hide the form and clear input fields
		this._hideForm();

		//Set loacle storage to all workouts
		this._setLocalStorage();
	}

	_renderWorkoutMarker(workout) {
		L.marker(workout.coords)
			.addTo(this.#map)
			.bindPopup(
				L.popup({
					maxWidth: 250,
					minWidth: 100,
					autoClose: false,
					closeOnClick: false,
					className: `${workout.type}-popup`,
				})
			)
			.setPopupContent(
				`${workout.type === "running" ? "🏃‍➡️" : "🚴"} ${workout.description}`
			)
			.openPopup();
	}

	_renderWorkout(workout) {
		let html = `
		<li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${workout.description}</h2>
          <div class="workout__details">
            <span class="workout__icon">${
							workout.type === "running" ? "🏃‍➡️" : "🚴"
						}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>
		  `;

		if (workout.type === "running") {
			html += `
			<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
		}

		if (workout.type === "cycling") {
			html += `
			  <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>
		`;
		}

		form.insertAdjacentHTML("afterend", html);
	}

	_moveToPopup(e) {
		const workoutEl = e.target.closest(".workout");
		if (!workoutEl) return;

		const workout = this.#workouts.find((el) => el.id === workoutEl.dataset.id);
		console.log(workout);

		this.#map.setView(workout.coords, this.#mapZoomLvl, {
			animate: true,
			pan: {
				duration: 1,
			},
		});
	}

	_setLocalStorage() {
		localStorage.setItem("workouts", JSON.stringify(this.#workouts));
	}

	_getLocalStorage() {
		const data = JSON.parse(localStorage.getItem("workouts"));

		if (!data) return;

		this.#workouts = data;
		this.#workouts.forEach((workout) => {
			this._renderWorkout(workout);
		});
	}

	reset() {
		localStorage.removeItem("workouts");
		location.reload();
	}
}

const app = new App();
