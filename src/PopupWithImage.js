import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._cardImage = this._popupElement.querySelector(".modal__preview-image");
    this._cardTitle = this._popupElement.querySelector(
      ".modal__preview-description"
    );
  }

  open({ title, link }) {
    // set the src, textContent and alt
    // this._title = this._cardImage.name;
    // this._link = this._cardImage.link;
    this._cardImage.src = link;
    this._cardImage.alt = title;
    this._cardTitle.textContent = title;
    super.open();
  }
}
