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


const EditFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);

const addFormValidator = new FormValidator(validationSettings, addCardForm);
const PreviewModal = new ModalWithImage(selectors.previewModal);
const AddCard = new ModalWithForm(
  handleAddCardFormSubmit,
  selectors.addCardForm
);

const CardSection = new Section(createCard, selectors.cardSection);

const profileEditForm = new ModalWithForm(
  handleProfileEditFormSubmit,
  selectors.profileEditForm
);

CardSection.renderItems(initialCards);
EditFormValidator.enableValidation();
addFormValidator.enableValidation();
PreviewModal.setEventListeners();
AddCard.setEventListeners();
profileEdit.setEventListeners();

/*Event Handlers*/

function handleProfileEditFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEdit);
}

function handleAddCardFormSubmit(e) {
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