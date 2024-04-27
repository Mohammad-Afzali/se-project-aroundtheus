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
  cardTitleInput: "#add-card-input",
  cardLinkInput: "#add-url-input",
  profileEditForm: "#profile-edit-modal",
  profileDescription: "#profile-description",
  profileTitle: "#profile-title",
  formSelector: ".modal__form",
  editFormTitle: "#profile-title-input",
  editFormDetails: "#profile-description-input",
};