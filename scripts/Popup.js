export default class Popup {
  constructor({ popupSelector }) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    //add an event listener to the document keyup or key down
  }
  close() {
    this._popupElement.classList.remove("modal_opened");
    // remove event listener
  }

  _handleEscClose = () => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  };

  setEventListeners() {
    // set up a close listener
    this._popupElement.addEventListener("click", (e) => {
      console.log(e.target);
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("modal__close")
      ) {
        this.close();
      }
    });
  }
}
