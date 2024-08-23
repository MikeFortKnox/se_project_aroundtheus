import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  initialCards,
  profileEditModal,
  profileEditButton,
  addCardModal,
  profileTitle,
  profileDescription,
  profileTitleInput,
  profileDescriptionInput,
  profileEditForm,
  addCardFormElement,
  addNewCardButton,
  settings,
} from "../utils/constants.js";

const previewImagePopup = new PopupWithImage({
  popupSelector: "#card-preview-modal",
});
const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  const cardData = {
    name: data.title,
    link: data.url,
  };
  const newCard = createCard(cardData);
  cardList.addItem(newCard);
  addCardFormElement.reset();
  addFormValidator.disableButton();
});

const cardList = new Section(
  {
    items: initialCards,
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".cards__list"
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const currentUserInfo = userInfo.getUserInfo();
profileTitleInput.value = currentUserInfo.name;
profileDescriptionInput.value = currentUserInfo.description;

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardFormElement);

function createCard(cardData) {
  const cardElement = new Card(cardData, "#card-template", handleCardPreview);
  return cardElement.getView();
}

function renderCard(cardData, wrapper) {
  const cardElement = createCard(cardData);
  wrapper.prepend(cardElement);
}

previewImagePopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  "#edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

addCardPopup.setEventListeners();

cardList.renderItems();

function handleCardPreview(cardData) {
  previewImagePopup.open(cardData);
}

// Event Handlers

function handleProfileEditSubmit({ name, description }) {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();

export { PopupWithImage };
