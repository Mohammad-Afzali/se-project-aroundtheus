export default class FormValidator{

  constructor(settings, formElement) {
    this._inputSelector = settings._inputSelector;
    this.submitButtonSelector = settings.submitButtonSelector;
    this.inactiveButtonClass = settings.disabledButtonClass;
    this.inputErrorClass = settings.inputErrorClass
    this.errorClass = settings.errorClass;

    this._form = formElement;
  }

  _showInputError(inputElement) {
    this.errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this.errorElement.textContent = inputElement.validationMessage;
    this.errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this.errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this.errorElement.textContent = inputElement.validationMessage;
    this.errorElement.classList.remvove(this._errorClass);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputEls)) {this.disableButton(); return;}
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  _foundInvalidInput() {
    return !this._inputEls.every((inputElement) => inputElement.validity.valid);
  }

  _checkInputValidity() {
    if (!inputEl.validity.valid) {return this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }

  }

  _setEventLister() {
    this._inputElements = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((_inputElement) => {this._inputElements.addEventListener("input", (_evt) => {
     this._checkInputValidity(_inputElement); 
     this._toggleButtonState();

      });
    });

    this._toggleButtonState(); 

  }

  enabaleValidation(){
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

 /* Sprint 6 validation.js*/

/*function showInputError(formElement,inputElement,{ inputErrorClass, errorClass }
    ) {
      errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
      inputElement.classList.add(inputErrorClass);
      errorMessage.textContent = inputElement.validationMessage;
      errorMessage.classList.add(errorClass);
  }
  
  function hideInputError(formElement,inputElement,{ inputErrorClass, errorClass }
      ) {
        errorMessage = formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(inputErrorClass);
        errorMessage.textContent = inputElement.validationMessage;
        errorMessage.classList.remove(errorClass);
    }
  
  function checkInputValidity(formElement,inputElement,options) {
      if (!inputElement.validity.valid) {
          showInputError(formElement,inputElement,options);
      } else {
          hideInputError(formElement,inputElement,options);
      }
  }
  
  function foundInvalidInput(inputList) {
      return !inputList.every((inputElement) => inputElement.validity.valid);
    }
    
    function disableButton(submitButton, { inactiveButtonClass }) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
    }
    
    function enableButton(submitButton, { inactiveButtonClass }) {
      submitButton.classList.remove(inactiveButtonClass);
      submitButton.disabled = false;
    }
    
    function toggleButtonState(inputElements,submitButton,{ inactiveButtonClass }
    ) {
      if (foundInvalidInput(inputElements)) {
        return disableButton(submitButton, { inactiveButtonClass });
      }
      enableButton(submitButton, { inactiveButtonClass });
  }
  
  function setEventListeners(formElement, options) {
      const { inputSelector } = options;
      const inputElements = [...formElement.querySelectorAll(inputSelector)];
      const submitButton = formElement.querySelector(options.submitButtonSelector);
      toggleButtonState(inputElements, submitButton, options);
      inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", (evt) => {
          checkInputValidity(formElement, inputElement, options);
          toggleButtonState(inputElements, submitButton, options);
        });
      });
    }
  
  function enableValidation(options) {
      const formElements = [...document.querySelectorAll(options.formSelector)];
      formElements.forEach((formElement) => {
        formElement.addEventListener("submit", (evt) => {
          evt.preventDefault();
        });
      
        setEventListeners(formElement, options);
      });
    }
  
  const config = {
      formSelector: ".modal__form",
      inputSelector: ".modal__form-input",
      submitButtonSelector: ".modal__button",
      inactiveButtonClass: "modal__button_disabled",
      inputErrorClass: "modal__input_type_error",
      errorClass: "modal__error_visible",
    };
  
    enableValidation(config);*/
