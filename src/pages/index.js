import FormValidator from "../components/FormValidator.js";
import Card from"../components/Card.js";
import "./index.css";
import Api from "../components/Api.js";
import ModalWithConfirmation from "../components/ModalWithConfirmation.js";
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "154d8d9b-7465-477d-b941-b7f941dd70ae",
    "Content-Type": "application/json",
  },
});

const cardSection = new Section(createCard, selectors.cardSection);

api.getInitialCards().then((data) => {
  cardSection.renderItems(data);
});


const currentUserInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription
);

const deleteCardModal = new ModalWithConfirmation({
  ModalSelector: "#delete-card-modal",
  // handleConfirm: confirmAction,
});

const previewModal = new ModalWithImage(selectors.previewModal);
const addCard = new ModalWithForm(
  selectors.addCardForm,
  handleAddCardFormSubmit,
);


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
  const cardElement = new Card(data, handleImageClick , "#cards-template" , handleDeleteClick);
  return cardElement.generateCard();
}

function handleImageClick(imgData) {
  previewModal.open(imgData);
}

function handleDeleteClick(card) {
console.log(card);
deleteCardModal.open();
deleteCardModal.setHandleConfirm(() => {
  //call Api here
}) 
}

function handleProfileFormSubmit(inputValues) {
  updateUserInfo(inputValues);
  profileEditForm.close();
  formValidators["profile-edit-form"].resetValidation();
}

function handleAddCardFormSubmit(inputValues) {
api.addNewCard(inputValues).then((data) => {
  const cardElement = createCard(inputValues);
  cardSection.addItem(cardElement);
  formValidators["add-card-form"].resetValidation();
  addCard.close();
})
}

editProfileButton.addEventListener("click", () => {
  profileEditForm.open();
  setFormInfo(selectors.editFormTitle, selectors.editFormDetails);
});

addCardButton.addEventListener("click", () => {
  addCard.open();
});