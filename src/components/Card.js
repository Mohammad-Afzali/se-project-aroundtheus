export default class Card {
  constructor(
    data,
    handleImageClick,
    cardSelector,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this.id = data._id;
    this.isLiked = data.isLiked;
  }

  generateCard() {
    this._cardElement = this._getTemplete();
    this._cardLikeButton =
      this._cardElement.querySelector(".card__Like-Button");
    this._cardDeleteButton = this._cardElement.querySelector(
      ".card__Delete-Button"
    );
    this._cardTitleElement = this._cardElement.querySelector("#card-title");
    this._cardImageElement = this._cardElement.querySelector("#card-image");

    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._renderLikes();
    this._setEventListeners();

    return this._cardElement;
  }

  _getTemplete() {
    return document
      .querySelector(this._cardSelector)
      .content.firstElementChild.cloneNode(true);
  }
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._cardDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  updateIsLiked(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  _renderLikes() {
    if (this.isLiked) {
      this._cardLikeButton.classList.add("card__like-button_active");
    } else {
      this._cardLikeButton.classList.remove("card__like-button_active");
    }
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }
}
