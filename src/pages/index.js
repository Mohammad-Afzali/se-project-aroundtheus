import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
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

api
  .getInitialCards()
  .then((data) => {
    cardSection.renderItems(data);
  })
  .catch((err) => {
    console.log(err);
  });

const currentUserInfo = new UserInfo(
  selectors.profileTitle,
  selectors.profileDescription,
  selectors.profileAvatar
);

api
  .getUserInfo()
  .then((userData) => {
    currentUserInfo.setAvatar(userData.avatar);
    currentUserInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
    });
  })
  .catch((err) => {
    console.log(err);
  });

const deleteCardModal = new ModalWithConfirmation({
  modalSelector: "#delete-card-modal",
});
deleteCardModal.setEventListeners();

const previewModal = new ModalWithImage(selectors.previewModal);
const addCard = new ModalWithForm(
  selectors.addCardForm,
  handleAddCardFormSubmit
);

function handleAvatarSubmit(data) {
  editAvatarModal.renderLoading(true);
  console.log(data);
  api
    .updateAvatar({ avatar: data.url })
    .then((res) => {
      currentUserInfo.setAvatar(res.avatar);
      editAvatarModal.close();
    })
    .catch((err) => {
      console.error("Failed to update user avatar:", err);
    })
    .finally(() => {
      editAvatarModal.renderLoading(false);
    });
}

const editAvatarModal = new ModalWithForm(
  "#edit-avatar-modal",
  handleAvatarSubmit
);
editAvatarModal.setEventListeners();

const profileAvatarContainer = document.querySelector(".profile__image");
profileAvatarContainer.addEventListener("click", () => {
  editAvatarModal.open();
});

const profileEditForm = new ModalWithForm(
  selectors.profileEditForm,
  handleProfileFormSubmit
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
};

enableValidation(selectors);
profileEditForm.setEventListeners();
addCard.setEventListeners();
previewModal.setEventListeners();

function setFormInfo(nameSelector, detailsSelector) {
  const formName = document.querySelector(nameSelector);
  const formDetails = document.querySelector(detailsSelector);
  const { description, name } = currentUserInfo.getUserInfo();
  formName.value = name.trim();
  formDetails.value = description.trim();
}

function createCard(data) {
  const cardElement = new Card(
    data,
    handleImageClick,
    "#cards-template",
    handleDeleteClick,
    handleLikeClick
  );
  return cardElement.generateCard();
}

function handleLikeClick(card) {
  if (card.isLiked) {
    api
      .unlikeCard(card.id)
      .then((res) => {
        card.updateIsLiked(res.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api
      .likeCard(card.id)
      .then((res) => {
        card.updateIsLiked(res.isLiked);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function handleImageClick(imgData) {
  previewModal.open(imgData);
}

function handleDeleteClick(card) {
  console.log(card);
  deleteCardModal.open();
  deleteCardModal.setHandleConfirm(() => {
    return api
      .deleteCard(card.id)
      .then(() => {
        card.handleDeleteButton();
        deleteCardModal.close();
      })
      .catch((error) => {
        console.error(error);
      });
  });
}

function handleProfileFormSubmit(inputValues) {
  profileEditForm.renderLoading(true);
  api
    .updateUserInfo(inputValues)
    .then((res) => {
      currentUserInfo.setUserInfo(res);
      profileEditForm.close();
      formValidators["profile-edit-form"].resetValidation();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditForm.renderLoading(false);
    });
}

function handleAddCardFormSubmit(inputValues) {
  addCard.renderLoading(true);
  api
    .addNewCard(inputValues)
    .then((data) => {
      const cardElement = createCard(data);
      cardSection.addItem(cardElement);
      formValidators["add-card-form"].resetValidation();
      addCard.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addCard.renderLoading(false);
    });
}

editProfileButton.addEventListener("click", () => {
  profileEditForm.open();
  setFormInfo(selectors.editFormTitle, selectors.editFormDetails);
});

addCardButton.addEventListener("click", () => {
  addCard.open();
});
