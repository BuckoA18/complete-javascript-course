const showModalButtons = document.querySelectorAll(".show-modal");
const modalElement = document.querySelector(".modal");
const closeModalButton = document.querySelector(".close-modal");
const overlay = document.querySelector(".overlay");

const closeModal = () => {
	modalElement.classList.add("hidden");
	overlay.classList.add("hidden");
};

const openModal = () => {
	modalElement.classList.remove("hidden");
	overlay.classList.remove("hidden");
};

showModalButtons.forEach((modal) => {
	modal.addEventListener("click", openModal);
});

closeModalButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", (e) => {
	if (e.key !== "Escape") return;
	closeModal();
});
