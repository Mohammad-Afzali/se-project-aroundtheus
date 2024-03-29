import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super({ modalSelector });
    this._previewImage = this._modalElement.querySelector(".modal__image");
    this._previewImageTitle = this._modalElement.querySelector(
      ".modal__image-preview"
    );
  }

  open(data) {
    this._previewImage.src = data.link;
    this._previewImage.alt = data.name;
    this._previewImageTitle.textContent = data.name;
    super.open();
  }
}