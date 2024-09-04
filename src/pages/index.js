import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import "./index.css";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import {
  // initialCards,
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
import Api from "../components/API.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "50644799-43da-42c8-ae19-a67fa2a948b2",
    "Content-Type": "application/json",
  },
});

const previewImagePopup = new PopupWithImage({
  popupSelector: "#card-preview-modal",
});

const cardList = new Section(
  {
    items: [],
    renderer: (data) => {
      cardList.addItem(createCard(data));
    },
  },
  ".cards__list"
);

const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  const cardData = {
    name: data.title,
    link: data.url,
  };
  api
    .addCards(cardData)
    .then((res) => {
      const card = createCard(res);
      cardList.addItem(card);
      addCardFormElement.reset();
      addFormValidator.resetValidation();
      addCardPopup.close();
    })
    .catch((err) => {
      console.error(`Error, could not add card: ${err}`);
    });
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardFormElement);

function handleLikeClick(data) {
  if (!data._isLiked) {
    api
      .likeACard(data._id)
      .then((res) => {
        console.log("0000");
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .dislikeACard(data._id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleDeleteClick() {
  api
    .handleDeleteCard()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}

function createCard(cardData) {
  const cardElement = new Card(
    cardData,
    "#card-template",
    handleCardPreview,
    handleLikeClick,
    handleDeleteClick
  );
  return cardElement.getView();
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

function handleProfileEditSubmit(userData) {
  const { name, description } = userData;
  api.updateUserProfile({ name, about: description }).then((updateUserData) => {
    console.log(updateUserData);
    userInfo.setUserInfo({
      name: updateUserData.name,
      description: updateUserData.about,
    });
    profileEditModal.close();
  });

  // userInfo.setUserInfo({ name, description });
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileTitleInput.value = userData.name;
  profileDescriptionInput.value = userData.description;
  editProfilePopup.open();
});

addNewCardButton.addEventListener("click", () => {
  addCardPopup.open();
});

editFormValidator.enableValidation();
addFormValidator.enableValidation();

api.getInitialCards().then((res) => {
  console.log(res);
  cardList.addItem(createCard(res[0]));
});
