import FormValidator from "./components/FormValidator.js";
import Card from"./components/Card.js";
import "./index.css";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";
import {
  initialCards,
  validationSettings,
  selectors,
  editProfileButton,
  addCardButton,
  addCardForm,
  profileEditForm,
} from "../utils/constants.js";


const EditFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const AddFormValidator = new FormValidator(validationSettings, addCardForm);

const PreviewModal = new PopupWithImage(selectors.previewModal);

const AddCard = new PopupWithForm(
  handleAddCardFormSubmit,
  selectors.addCardForm
);

const CardSection = new Section(createCard, selectors.cardSection);

const ProfileEdit = new PopupWithForm(
  handleProfileFormSubmit,
  selectors.profileEditForm
);

CardSection.renderItems(initialCards);

EditFormValidator.enableValidation();

AddFormValidator.enableValidation();

PreviewModal.setEventListeners();

AddCard.setEventListeners();

ProfileEdit.setEventListeners();

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
  addFormValidator.resetValidation();
  renderCard({ name, link });
  closeModal(addCardModal);
}

function createCard (cardData) {
  const card = new Card(cardData, "#cards-template", handleImageClick);
  return card.generateCard()

}

function renderCard(cardData,) {
  const cardElement =createCard(cardData)
  cardListElement.prepend(cardElement);
}

/*Card*/

initialCards.forEach(renderCard);

function handleImageClick(card) {
  openModal(cardImageModal);
  modalImage.src = card.link;
  modalImage.alt = card.name;
  modalImageCaption.textContent = card.name;
}

editProfileButton.addEventListener("click", () => {
  ProfileEdit.open();
});

addCardButton.addEventListener("click", () => {
  AddCard.open();
});