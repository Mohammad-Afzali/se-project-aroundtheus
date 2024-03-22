export const initialCards = [
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

export const editProfileButton = document.querySelector("#profile-edit-button");
export const profileEditForm = document.forms["profile-edit-form"];
export const addCardButton = document.querySelector(".profile__add-button");
export const addCardForm = document.forms["add-card-form"];

export const validationSettings = {
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const selectors = {
  cardSection: ".cards__list",
  cardTemplate: "#cards-template",
  previewModal: "#card-image-modal",
  addCardForm: "#add-card-modal",
  cardTitleInput: "#add-card-modal-title",
  cardLinkInput: "#add-card-modal-link",
  profileEditForm: "#profile-edit-modal",
  profileDescription: "#profile-description",
  profileTitle: "#profile-title",
  formSelector: ".modal__form",
  editFormTitle: "#edit-profile-modal-title",
  editFormDetails: "#edit-profile-modal-description",
  formsSelector: ".modal__form",
};