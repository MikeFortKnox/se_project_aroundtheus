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
  deleteModal,
  editAvatar,
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
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import Api from "../components/API.js";
import { data } from "autoprefixer";

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

const confirmDeleteModal = new PopupWithConfirm(
  "#delete-modal",
  handleDeleteClick
);
confirmDeleteModal.setEventListeners();

const editAvatarModal = new PopupWithForm("#edit-avatar-modal", (input) => {
  editAvatarModal.setLoading("Saving...");
  handleAvatarEditSubmit(input);
});
editAvatarModal.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", (data) => {
  const cardData = {
    name: data.title,
    link: data.url,
  };

  addCardPopup.setLoading("Saving...");

  api
    .addCards(cardData)
    .then((res) => {
      const card = createCard(res);
      cardList.addItem(card);
      addCardFormElement.reset();
      addFormValidator.resetValidation();
      addCardPopup.close();
      addCardPopup.setLoading("Save");
    })
    .catch((err) => {
      console.error(`Error, could not add card: ${err}`);
    })
    .finally(() => {
      addCardFormElement.reset();
      addFormValidator.resetValidation();
      addCardPopup.setLoading("Save");
    });
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

function handleLikeClick(data) {
  if (!data.isLiked) {
    api
      .likeACard(data._id, { method: "PUT" })
      .then((res) => {
        console.log(res);
        data.isLiked = true;
        data.toggleLike();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .dislikeACard(data._id, { method: "DELETE" })
      .then((res) => {
        console.log(res);
        data.isLiked = false;
        data.toggleLike();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleDeleteClick(card) {
  const cardId = card._id;
  if (!cardId) {
    console.error("card._id is undefined");
    return;
  }
  confirmDeleteModal.setSubmitFunction(() => {
    api
      .handleDeleteCard(cardId)
      .then((res) => {
        console.log(res);
        card.handleDeleteCard();
        confirmDeleteModal.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
  confirmDeleteModal.open();
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

// cardList.renderItems();

function handleCardPreview(cardData) {
  previewImagePopup.open(cardData);
}

// Event Handlers

function handleProfileEditSubmit(userData) {
  const { name, description } = userData;
  editProfilePopup.setLoading("Saving...");
  api
    .updateUserProfile({ name, about: description })
    .then((updateUserData) => {
      console.log(updateUserData);
      userInfo.setUserInfo({
        name: updateUserData.name,
        description: updateUserData.about,
      });

      profileEditForm.reset();

      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editProfilePopup.setLoading("Save");
    });
}

function handleAvatarEditSubmit(input) {
  const link = input.avatar;
  api
    .editProfileImage(link)
    .then((userData) => {
      userInfo.setAvatarInfo(userData.avatar);
      // editAvatarModal.setLoading("Saving...");
      editAvatarModal.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarModal.setLoading("Save");
    });
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

// add event listener to avatar
document
  .querySelector(".profile__avatar-edit")
  .addEventListener("click", () => {
    editAvatarModal.open();
  });
// when it fires, open avatar image modal

const editFormValidator = new FormValidator(settings, profileEditForm);
const addFormValidator = new FormValidator(settings, addCardFormElement);
const editAvatarValidator = new FormValidator(settings, editAvatar);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
editAvatarValidator.enableValidation();

api
  .getInitialCards()
  .then((res) => {
    cardList.renderItems(res);
  })
  .catch((err) => console.log(err));

api
  .getUserInfo()
  .then((userData) => {
    const { name, about, avatar } = userData;
    userInfo.setUserInfo({ name: name, description: about });
    userInfo.setAvatarInfo(avatar);
  })
  .catch((err) => console.log(err));
