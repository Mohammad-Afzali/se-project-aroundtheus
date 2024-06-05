import Modal from "./Modal";

export default class ModalWithConfirmation extends Modal {
  constructor({ modalSelector }) {
    super({modalSelector});
    this._confirmButton = this._modalElement.querySelector(
      ".modal__form-button"
    );
    this._formEl = this._modalElement.querySelector('.modal__form');
  }

  renderLoading(isLoading, loading = "Deleting...") {
    if (isLoading) {
      this._confirmButton.textContent = loading;
    } else {
      this._confirmButton.textContent = "Yes";
    }
  }

  // open(card, cardId) {
  //   super.open();
  //   this._card = card;
  //   this._cardId = cardId;
  // }

  setHandleConfirm(handleConfirm){
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      this.renderLoading(true);
      this._handleConfirm(this._card, this._cardId)
        .then(() => {
          this.close();
        })
    });
  }
}