import Popup from "./popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector("modal__button-save");
    this._inputList = [...this._popupForm.querySelectorAll("modal__input")];
    this._setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((inputEl) => {
      inputValues[inputEl.name] = inputEl.value;
    });
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = this._getInputValues();
      this._handleFormSubmit(data);
      this.reset();
    });
  }

  reset() {
    this._popupForm.reset();
    super.close();
  }
}

// index.js

const newCardPopup = new PopupWithForm("#add-card-modal", () => {});
// call setEventListeners

// newCardPopup.open();

// newCardPopup.close();
