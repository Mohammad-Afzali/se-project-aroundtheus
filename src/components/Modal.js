export default class Modal {
    constructor(modalSelector) {
      this._modalElement = document.querySelector(modalSelector);
    }
    
    open() {
      this._modalElement.classList.add("modal_opened");
      document.addEventListener("keydown", this._handleEscClose);
      document.addEventListener("mousedown", this._closeModalOnRemoteClick);
    }
   
    close() {
      this._modalElement.classList.remove("modal_opened");
      document.removeEventListener("keydown", this._handleEscClose);
      document.removeEventListener("mousedown", this._closeModalOnRemoteClick);
    }
  
    _handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        this.close();
      }
    };
  
    _closeModalOnRemoteClick = (evt) => {
      if (
        evt.target.classList.contains("modal_opened") ||
        evt.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    };
  
    setEventListeners() {
      this._modalCloseButton = this._modalElement.querySelector(
        ".modal__close-button"
      );
      this._modalCloseButton.addEventListener("click", () => this.close());
    }
  }