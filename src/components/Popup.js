export default class Popup {
    constructor(popupSelector) {
      this._popupElement = document.querySelector(popupSelector);
    }
    //opens popup
    open() {
      this._popupElement.classList.add("modal_opened");
      document.addEventListener("keydown", this._handleEscClose);
      document.addEventListener("mousedown", this._closeModalOnRemoteClick);
    }
    //close popup
    close() {
      this._popupElement.classList.remove("modal_opened");
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
      this._popupCloseButton = this._popupElement.querySelector(
        ".modal__close-button"
      );
      this._popupCloseButton.addEventListener("click", () => this.close());
    }
  }