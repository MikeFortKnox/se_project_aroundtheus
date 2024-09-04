import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor(modalSelector, handleFormSubmit) {
    super({ modalSelector });

    this._form = this._popupElement.querySelector(".modal__form");
    this._modalButton = this._form.querySelector(".modal__button");
  }

  setSubmitFunction(fnc) {
    this._submitFunction = fnc;
  }
}
