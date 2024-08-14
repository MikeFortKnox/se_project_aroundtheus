import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._popupElement.querySelector("modal__button-save");
    this._inputList = [...this._popupForm.querySelectorAll("modal__input")];
    this._formElement = this._popupElement.querySelector(".modal__form");
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  _getInputValues() {
    this._inputList = this._formElement.querySelectorAll(".popup__input");
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
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
