export default class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this.inputErrorClass = settings.inputErrorClass;
    this.errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputElement) {
    this.errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.inputErrorClass);
    this.errorElement.textContent = inputElement.validationMessage;
    this.errorElement.classList.add(this.errorClass);
  }

  _hideInputError(inputElement) {
    this.errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.inputErrorClass);
    this.errorElement.textContent = inputElement.validationMessage;
    this.errorElement.classList.remove(this.errorClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _hasInvalidInput() {
    return !this._inputElements.every(
      (inputElement) => inputElement.validity.valid
    );
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      return this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputElements = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this.submitButtonSelector);
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", (_evt) => {
        this._checkInputValidity(inputElement,);
        this._toggleButtonState();
      });
    });

    this._toggleButtonState();
  }

  enabaleValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }
}


