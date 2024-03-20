import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor({ ModalSelector }) {
    super(ModalSelector);
    this._previewImage = this._modalElement.querySelector(
      ".modal__image-preview"
    );
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