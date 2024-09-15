import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });

    this._form = this._popupElement.querySelector(".modal__form");
    this._modalButton = this._form.querySelector(".modal__button");
    this._submitFunction = handleFormSubmit;
  }

  setSubmitFunction(fnc) {
    this._submitFunction = fnc;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._submitFunction();
    });
  }
}
