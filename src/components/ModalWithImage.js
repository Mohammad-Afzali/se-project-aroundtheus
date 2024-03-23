import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._previewImage = this._modalElement.querySelector(".modal__image");
    this._previewImageTitle = this._modalElement.querySelector(
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