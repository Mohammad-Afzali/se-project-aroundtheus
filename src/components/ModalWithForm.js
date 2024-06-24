import Modal from "./Modal.js";

export default class ModalwithForm extends Modal {
  constructor(modalSelector, handleFormSubmit) {
     super({ modalSelector });
    this._modalForm = this._modalElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._modalForm.querySelectorAll(".modal__form-input");
    this._submitButton = this._modalForm.querySelector('.modal__button');
    this._submitButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValues = {};
    for (const input of this._inputList) {
      inputValues[input.name] = input.value;
    }

    return inputValues;
  }
  setEventListeners() {
    super.setEventListeners();
    this._modalForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }
  
  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }
  
  renderLoading(isLoading, loading = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loading;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}