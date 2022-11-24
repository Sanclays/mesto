//данные с верстки
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const aboutProfile = profile.querySelector('.profile__about');
const libraryContainer = document.querySelector('.library__list');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

//popup редактирования профиля
const popupEditProfile = document.querySelector('.popup_profile_edit');
const profileEdit = document.querySelector('.profile__edit');
const popupCloseEditProfile = popupEditProfile.querySelector('.popup__close');
const formEditProfile = document.forms.profileEdit;
const usernameInput = formEditProfile.elements.username;
const aboutInput = formEditProfile.elements.about;
const buttonEditProfile = formEditProfile.querySelector('.popup__button');

//popup добавления карточки
const popupAddCard = document.querySelector('.popup_card_add')
const addCard = document.querySelector('.add-button');
const popupCloseAddCard = popupAddCard.querySelector('.popup__close');
const formAddCard = document.forms.cardAdd;
const nameCard = formAddCard.elements.cardName;
const linkCard = formAddCard.elements.cardLink;
const cardTemplate = document.querySelector('#card-template').content;

//popup зума изображения
const popupCard = document.querySelector('.popup_card_open');
const popupCloseCard = popupCard.querySelector('.popup__close');
const popupImage = popupCard.querySelector('.popup__image');
const popupFigcaption = popupCard.querySelector('.popup__figcaption');

//функция добавления класса для открытия Popup`a
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
  popup.addEventListener('click', closePopupClickOverlay);
}

//функция удаление класса для закрытия Popup`а
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
  popup.removeEventListener('click', closePopupClickOverlay);
}

//функция закрытия popup по нажатию клавиши Escape
function closePopupByEsc (evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

//функция закрытия popup при клике на overlay
function closePopupClickOverlay (evt) {
  if (evt.target.classList.contains('popup_opened')){
    closePopup(evt.target);
  }
}

// открытие popup редактирование профиля
profileEdit.addEventListener('click', () => {
  usernameInput.value = nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
  disabledButtonSubmit(buttonEditProfile);
  openPopup(popupEditProfile);
});

// отправка изменений профиля на web
formEditProfile.addEventListener('submit', () => {
  nameProfile.textContent = usernameInput.value;
  aboutProfile.textContent = aboutInput.value;
  closePopup(popupEditProfile);
});

//открытие popup добавления карточки
addCard.addEventListener('click', () => {
  openPopup(popupAddCard);
});

//отправка данных для добавления карточки
formAddCard.addEventListener('submit', () => {
  renderCard({name: nameCard.value, link: linkCard.value});
  closePopup(popupAddCard);

});

// закрытие popup редактирование  профиля
popupCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

// закрытие popup добавления карточки
popupCloseAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

//закрытие popup изображения
popupCloseCard.addEventListener('click', () => {
  closePopup(popupCard);
});

//создание элемента card
function createCard(item) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__img');
  cardElement.querySelector('.card__title').textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = item.name;
  likeCard(cardElement.querySelector('.card__like'));
  deleteCard(cardElement.querySelector('.card__delete'));
  setCardImageEventListener(cardImg);
  return cardElement;
}

//добавление элементов card в верстку
function renderCard (item) {
  libraryContainer.prepend(createCard(item));
}

//создание элементов card из массива
initialCards.forEach(card => renderCard(card));


//обработка клика на лайк
function likeCard (button) {
  button.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active')
  });
}

//обработка клика на корзину
function deleteCard (button) {
  button.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove()
  });
}

//обработка клика на изображение
function setCardImageEventListener (cardImage) {
  cardImage.addEventListener('click', (evt) => {
    const imageCard = evt.target;
    popupImage.src = imageCard.src;
    popupImage.alt = imageCard.alt;
    popupFigcaption.textContent = imageCard.alt;
    openPopup(popupCard);
  });
}