// export const initialCards = [
//   {
//     name: "Yosemite Valley",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
//   },
//   {
//     name: "Lake Louise",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
//   },
//   {
//     name: "Bald Mountains",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
//   },
//   {
//     name: "Latemar",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
//   },
//   {
//     name: "Vanoise National Park",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
//   },
//   {
//     name: "Lago di Braies",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
//   },
// ];

export const profileEditModal = document.querySelector("#edit-modal");
export const profileEditButton = document.querySelector("#profile-edit-button");
export const addCardModal = document.querySelector("#add-card-modal");
export const profileTitle = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileTitleInput = profileEditModal.querySelector(
  "#profile-title-input"
);
export const profileDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardFormElement = addCardModal.querySelector(".modal__form");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const deleteModal = document.querySelector("#delete-modal");
export const editAvatarModal = document.querySelector("#edit-avatar-form");

export const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button-save",
  inactiveButtonClass: "modal__button-save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
