export default class Card {
  
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;

    this._handleImageClick = handleImageClick;
  }

  generateCard () {

    this._cardElement = this._getTemplete();
    this._cardLikeButton =
      this._cardElement.querySelector(".card__Like-Button");
    this._cardDeleteButton = 
      this._cardElement.querySelector("#card__Delete-Button");
    this._cardTitleElement = this._cardElement.querySelector("#card-Title");
    this._cardImageElement = this._cardElement.querySelector("#card-Image");

    this._cardTitleElement.textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _getTemplete() {
    return document.querySelector(this._cardSelector).Content.firstElementChild.cloneNode(true);
  }
  _setEventListeners() {
    this._cardLikeButton.addEventListener("click", () => {
       this._handleLikeButton();
      });

    this._cardDeleteButton.addEventListener("click", () => {
        this._handleDeleteButton();
      });

    this._cardImageElement.addEventListener("click", () => {
        this._handleImageClick();
       });
  }

  _handleLikeButton() {
    this._cardLikeButton.classList.toggle(".card__Like-Button_active");
  }

  _handleDeleteButton() {
    this._cardElement.remove();
  }
}