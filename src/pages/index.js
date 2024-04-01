import FormValidator from "../components/FormValidator.js";
import Card from"../components/Card.js";
import "./index.css";
import ModalWithImage from "../components/ModalWithImage.js";
import ModalWithForm from "../components/ModalWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  selectors,
  editProfileButton,
  addCardButton,
} from "../utils/constants.js";

const currentUserInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);


const previewModal = new ModalWithImage(selectors.previewModal);
const addCard = new ModalWithForm(
  selectors.addCardForm,
  handleAddCardFormSubmit,
);

const cardSection = new Section(createCard, selectors.cardSection);
const profileEditForm = new ModalWithForm(
  selectors.profileEditForm,
  handleProfileFormSubmit,
);

const formValidators = {};
const enableValidation = (selectors) => {
  const formList = Array.from(
    document.querySelectorAll(selectors.formSelector)
  );
  formList.forEach((formElement) => {
    const validator = new FormValidator(validationSettings, formElement);
    const formName = formElement.getAttribute("name");
    validator.enableValidation();
    

    formValidators[formName] = validator;
  });
};;

cardSection.renderItems(initialCards);
enableValidation(selectors);
profileEditForm.setEventListeners();
addCard.setEventListeners();
previewModal.setEventListeners();

function updateUserInfo({ name, description }) {
  currentUserInfo.setUserInfo({ name, description });
}

function setFormInfo(nameSelector, detailsSelector) {
  const formName = document.querySelector(nameSelector);
  const formDetails = document.querySelector(detailsSelector);
  const { description, name } = currentUserInfo.getUserInfo();
  formName.value = name.trim();
  formDetails.value = description.trim();
}

function createCard(data) {
  const cardElement = new Card(data, handleImageClick , "#cards-template");
  return cardElement.generateCard();
}

function handleImageClick(imgData) {
  previewModal.open(imgData);
}

function handleProfileFormSubmit(inputValues) {
  updateUserInfo(inputValues);
  profileEditForm.close();
  formValidators["profile-edit-form"].resetValidation();
}

function handleAddCardFormSubmit(inputValues) {
  const cardElement = createCard(inputValues);
  cardSection.addItem(cardElement);
  formValidators["add-card-form"].resetValidation();
  addCard.close();
}

editProfileButton.addEventListener("click", () => {
  profileEditForm.open();
  setFormInfo(selectors.editFormTitle, selectors.editFormDetails);
});

addCardButton.addEventListener("click", () => {
  addCard.open();
});