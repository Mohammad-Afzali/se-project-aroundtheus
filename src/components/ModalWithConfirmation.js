import Modal from "./Modal";

export default class ModalWithConfirmation extends Modal {
  constructor({ modalSelector }) {
    super({modalSelector});
    this._confirmButton = this._modalElement.querySelector(
      ".modal__button"
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

  setHandleConfirm(handleConfirm){
    this._handleConfirm = handleConfirm;
  }

  setEventListeners() {
    super.setEventListeners();
    
    this._formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      this.renderLoading(false);
      this._handleConfirm()

    });
  }
}