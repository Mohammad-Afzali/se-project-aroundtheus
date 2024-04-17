import Modal from "./Modal";

export default class ModalWithConfirmation extends Modal {
  constructor({ popupSelector, handleConfirm }) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popupElement.querySelector(
      ".modal__form-button"
    );
  }

  renderLoading(isLoading, loading = "Deleting...") {
    if (isLoading) {
      this._confirmButton.textContent = loading;
    } else {
      this._confirmButton.textContent = "Yes";
    }
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();

    this._confirmButton.addEventListener("click", () => {
      this.renderLoading(true);
      this._handleConfirm(this._card, this._cardId)
        .then(() => {
          this.close();
        })
        .finally(() => {
          this.renderLoading(false);
        });
    });
  }
}