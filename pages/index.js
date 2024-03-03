import FormValidator from "../components/FormValidator.js";
import Card from"../components/Card.js";

const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
  
    {
      name: "Lake Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    },
  ];
  
const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(
  "#modal-close-button"
);
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector("#preview-card-image");
const previewModalCaption = previewImageModal.querySelector(
  ".modal__image-caption"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(
  "#modal-close-button"
);
const addNewCardButton = document.querySelector(".profile__add-button");
const profileForm = document.forms["profile-form"];
const addCardForm = addCardModal.querySelector(".modal__form");
const cardListElement = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardTitleInput = addCardForm.querySelector(".modal__form-input-title");
const cardUrlInput = addCardForm.querySelector(".modal__form-input-url");

/*Functions


function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");
  cardImageElement.src = cardData.link;
  cardImageElement.alt = cardData.name;
  cardTitleElement.textContent = cardData.name;
 
  cardImageElement.addEventListener("click", () => {
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
    previewModalCaption.textContent = cardData.name;
    openModal(previewImageModal);
  });

  /*const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card_like-button_active");
  });

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}*/

/*Event Handlers*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  e.target.reset();
  renderCard({ name, link }, cardListElement);
  closeModal(addCardModal);
}


/*function renderCard(cardData, wrapper) {
  const cardElement = getcardElement(cardData);
  wrapper.prepend(cardElement);
}*/

/*Event Listeners*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

const closeButtons = document.querySelectorAll('.modal__close');
closeButtons.forEach((button) => {
  const modal = button.closest('.modal');
  button.addEventListener('click', () => closeModal(modal));
});

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closeModal(modal);
  }
}

function closeModalByClickOff(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEsc);
  modal.removeEventListener("mousedown", closeModalByClickOff)
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEsc);
  modal.addEventListener("mousedown", closeModalByClickOff);
}

profileForm.addEventListener("submit", handleProfileEditSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);
addNewCardButton.addEventListener("click", () => openModal(addCardModal));

/*initialCards.forEach((cardData) => renderCard(cardData, cardListElement));*/

/*Card*/

closeButtons.forEach((button) => {
  const closeModal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(closeModal));
});

initialCards.forEach((cardData) => {
  const card = new Card(cardData, "#cards-template", handleImageClick);
  const cardElement = card.generateCard();
  cardListElement.prepend(cardElement);
});

function handleImageClick(card) {
  openModal(cardImageModal);
  fullImage.src = card._cardImageElement.src;
  fullImage.alt = card._cardTitleElement.textContent;
  imageModalDescription.textContent = card._cardTitleElement.textContent;
}

/* FormValidation*/

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};


const editcardFormValidator  = new FormValidator(settings, profileEditModal);
const addcardFormValidator  = new FormValidator(settings, addCardForm);

editcardFormValidator.enabaleValidation();
addcardFormValidator.enabaleValidation();