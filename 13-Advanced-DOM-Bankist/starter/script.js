const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const section2 = document.querySelector("#section--2");
const section3 = document.querySelector("#section--3");
const nav = document.querySelector(".nav");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");

const header = document.querySelector(".header");

//Scroll effect to section-1

btnScrollTo.addEventListener("click", (e) => {
	e.preventDefault();
	section1.scrollIntoView({ behavior: "smooth" });
});

//Modal window

const openModal = function () {
	modal.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

const closeModal = function () {
	modal.classList.add("hidden");
	overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) =>
	btn.addEventListener("click", (e) => {
		e.preventDefault();
		openModal();
	})
);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
	if (e.key === "Escape" && !modal.classList.contains("hidden")) {
		closeModal();
	}
});

//Page navigation

//Add listener to a common parent element
//Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", (e) => {
	e.preventDefault();

	if (e.target.classList.contains("nav__link")) {
		const id = e.target.getAttribute("href");
		document.querySelector(`${id}`).scrollIntoView({ behavior: "smooth" });
	}
});

//Tabbed Component

tabsContainer.addEventListener("click", (e) => {
	const clicked = e.target.closest(".operations__tab");

	if (!clicked) return;

	// Active tab
	tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
	clicked.classList.add("operations__tab--active");

	//Active content
	tabsContent.forEach((tabContent) =>
		tabContent.classList.remove("operations__content--active")
	);
	document
		.querySelector(`.operations__content--${clicked.dataset.tab}`)
		.classList.add("operations__content--active");
});

//Menu fade animation

function handleHover(e) {
	// console.log(this);
	if (e.target.classList.contains("nav__link")) {
		const link = e.target;
		const siblings = link.closest(".nav").querySelectorAll(".nav__link");
		const logo = link.closest(".nav").querySelector("img");

		siblings.forEach((sibling) => {
			if (sibling !== link) {
				sibling.style.opacity = logo.style.opacity = this;
			}
		});
	}
}

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//Sticky navigation

const navHeight = nav.getBoundingClientRect();
const headerObserver = new IntersectionObserver(
	(entries) => {
		const [entry] = entries;

		if (!entry.isIntersecting) nav.classList.add("sticky");
		else nav.classList.remove("sticky");
	},
	{
		root: null,
		threshold: 0,
		rootMargin: `-${navHeight.height}px`,
	}
);
headerObserver.observe(header);

//Reveal sections
const allSections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(
	(entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.remove("section--hidden");
			observer.unobserve(entry.target);
		});
	},
	{
		root: null,
		threshold: 0.2,
	}
);

allSections.forEach((section) => {
	sectionObserver.observe(section);
	section.classList.add("section--hidden");
});

//Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");

const imgObserver = new IntersectionObserver(
	(entries, observer) => {
		[entry] = entries;

		if (!entry.isIntersecting) return;
		entry.target.src = entry.target.dataset.src;

		entry.target.addEventListener("load", (e) => {
			entry.target.classList.remove("lazy-img");
		});
		observer.unobserve(entry.target);
	},
	{
		root: null,
		threshold: 0.5,
	}
);

imgTargets.forEach((img) => imgObserver.observe(img));

//Slider
const slider = () => {
	let currentSlide = 0;
	const maxSlide = slides.length;
	const minSLide = 0;

	const createDots = () => {
		slides.forEach((_, index) => {
			dotsContainer.insertAdjacentHTML(
				"beforeend",
				`<button class="dots__dot" data-slide="${index}"></button>`
			);
		});
	};

	createDots();

	const activateDot = (slide) => {
		dotsContainer.childNodes.forEach((dot) =>
			dot.classList.remove("dots__dot--active")
		);
		dotsContainer.children[slide].classList.add("dots__dot--active");
	};

	const goToSLide = (slide) => {
		slides.forEach((s, index) => {
			s.style.transform = `translateX(${100 * (index - slide)}%)`;
		});
		activateDot(slide);
	};
	goToSLide(0);

	const nextSlide = () => {
		if (currentSlide === maxSlide - 1) {
			currentSlide = 0;
		} else {
			currentSlide++;
		}

		goToSLide(currentSlide);
	};

	const prevSlide = () => {
		if (currentSlide === minSLide) {
			currentSlide = maxSlide - 1;
		} else {
			currentSlide--;
		}

		goToSLide(currentSlide);
	};

	btnLeft.addEventListener("click", prevSlide);
	btnRight.addEventListener("click", nextSlide);

	document.addEventListener("keydown", (e) => {
		console.log(e);
		if (e.key === "ArrowRight") nextSlide();
		if (e.key === "ArrowLeft") prevSlide();
	});

	dotsContainer.addEventListener("click", (e) => {
		if (e.target.classList.contains("dots__dot")) {
			currentSlide = +e.target.dataset.slide;
			goToSLide(currentSlide);
		}
	});
};
slider();

////////////////////////////////
//Test code
