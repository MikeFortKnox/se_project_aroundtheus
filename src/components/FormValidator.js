export default class FormValidator {
  constructor(settings, formEl) {
    this._settings = settings;
    this._formEl = formEl;
    this._form = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
  }

  _showInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(inputEl) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._settings.inputErrorClass);
    errorMessageEl.classList.remove(this._settings.errorClass);
    errorMessageEl.textContent = "";
  }

  _toggleButtonState() {
    const foundInvalid = false;

    if (this._hasInvalidInput(this._inputEls)) {
      this.disableButton();
      return;
    }
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  // _hasInvalidInput() {
  //   return !inputList.every((inputEl) => inputEl.validity.valid);
  // }

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => {
      return !inputEl.validity.valid;
    });
  }

  _checkInputValidity(inputEl) {
    if (!inputEl.validity.valid) {
      return this._showInputError(inputEl);
    }
    this._hideInputError(inputEl);
  }

  _setEventListeners() {
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
    this._inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this.disableButton();
    //remove all error messages
    // remove all error classes
    // set submit button to disabled using this._toggleButtonState
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._isValid(formElement);
      });
      this._inputList = Array.from(
        formElement.querySelectorAll(this._inputSelector)
      );
      this._buttonElement = formElement.querySelector(
        this._submitButtonSelector
      );
      this._inputList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._isValid(formElement);
          this._toggleButtonState(this._inputList, this._buttonElement);
        });
      });
    });
  }
}

// const settings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__button-save",
//   inactiveButtonClass: "modal__button-save_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

// const editFormValidator = new FormValidator(settings, editForm);
// const addFormValidator = new FormValidator(settings, addForm);
