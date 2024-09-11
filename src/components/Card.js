export default class Card {
  // pass like and delete handlers from index.js
  constructor(
    data,
    cardSelector,
    handlePreviewPicture,
    handleLikeClick,
    handleDeleteClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isliked = data.isliked;
    this._cardSelector = cardSelector;
    this._handlePreviewPicture = handlePreviewPicture;
    // assign the handlers to the this object
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        // call the function that was passed from index.js
        // pass appropriate arg(s) -- this object would work
        this._handleLikeIcon();
      });
    // ".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
    this._cardImage.addEventListener("click", () =>
      this._handlePreviewPicture({ name: this._name, link: this._link })
    );
  }

  // _handleDeleteCard() {
  //   api
  //     .handleDeleteCard()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // private method becomes public
  // for use in handler .then()
  _handleLikeIcon() {
    // api code goes in the handler in index.js
    this._handleLikeClick(this);

    this._cardElement
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardName = this._cardElement.querySelector(".card__text");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardName.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }
}
