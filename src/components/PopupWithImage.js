import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(
      ".modal__image-preview"
    );
    this._previewImageTitle = this._popupElement.querySelector(
      ".modal__image-title"
    );
  }

  open(name, link) {
    this._Image.src = link;
    this._Image.alt = name;
    this._ImageTitle.textContent = name;
    super.open();
  }
}