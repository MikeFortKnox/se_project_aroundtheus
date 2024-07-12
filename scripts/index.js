const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

// Elements
const profileEditModal = document.querySelector("#edit-modal");
const profileModalCloseButton = profileEditModal.querySelector(".modal__close");
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardModalCloseButton = addCardModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = profileEditModal.querySelector(
  "#profile-title-input"
);
const profileDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardElement = cardTemplate.cloneNode(true);
const addNewCardButton = document.querySelector(".profile__add-button");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input-type-title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input-type-url");
const cardDeleteButton = cardElement.querySelector(".card__delete-button");
const cardPreviewModal = document.querySelector("#card-preview-modal");
const cardPreviewCaption = document.querySelector(
  ".modal__preview-description"
);

const cardPreviewImage = document.querySelector(".modal__preview-image");
const cardPreviewCloseButton = document.querySelector(
  "#card-preview-close-button"
);

function openModal(modal) {
  modal.classList.add("modal_opened");
  // Add event listener to the document to close modals on Escape key press
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal(modal);
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal_opened")) {
      closeModal(modal);
    }
  });
}

function handleCloseEsc(e) {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal_opened");
    closeModal(activeModal);
  }
}

document.addEventListener("keydown", handleCloseEsc);

// document.removeEventListener("keydown", handleCloseEsc);

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleModalCloseClick(event) {
  const target = event.target;
  if (
    target.classList.contains("modal") ||
    target.classList.contains("modal__close")
  ) {
    closeModal(target.closest(".modal"));
  }
}

document.addEventListener("click", handleModalCloseClick);

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTextEl = cardElement.querySelector(".card__text");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  // find delete button

  // add the event listener to the delete button

  // add click listener to the cardImage element
  cardImageEl.addEventListener("click", () => {
    cardPreviewCaption.textContent = cardData.name;
    cardPreviewImage.src = cardData.link;
    cardPreviewImage.alt = cardData.name;
    openModal(cardPreviewModal);
  });
  // openModal with previewImageModal

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardTextEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;

  cardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}

// Event Handlers

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closeModal(addCardModal);
  addCardFormElement.reset();
}

// Form Listeners
profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

// Event Listeners

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

// cardPreviewCloseButton.addEventListener("click", () => {
// closeModal(cardPreviewModal);
// });

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
// addCardModalCloseButton.addEventListener("click", () =>
closeModal(addCardModal);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
