//данные с верстки
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__text');
const libraryContainer = document.querySelector('.library__list');

//popup редактирования профиля
const popupEditProfile = document.querySelector('.popup_profile_edit');
const profileEdit = document.querySelector('.profile__edit');
const popupCloseEditProfile = popupEditProfile.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const usernameInput = formEditProfile.querySelector('#username');
const jobInput = formEditProfile.querySelector('#about');

//popup добавления карточки
const popupAddCard = document.querySelector('.popup_card_add')
const addCard = document.querySelector('.add-button');
const popupCloseAddCard = popupAddCard.querySelector('.popup__close');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameCard = formAddCard.querySelector('#name-card');
const linkCard = formAddCard.querySelector('#link-card');

//popup зума изображения
const popupCard = document.querySelector('.popup_card_open');
const popupCloseCard = popupCard.querySelector('.popup__close');
const popupImage = popupCard.querySelector('.popup__image');
const popupFigcaption = popupCard.querySelector('.popup__figcaption');

//функция добавления класса для открытия Popup`a
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//функция удаление класса для закрытия Popup`а
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// открытие popup редактирование профиля
profileEdit.addEventListener('click', () => {
  usernameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  openPopup(popupEditProfile);
});

// отправка изменений профиля на web
formEditProfile.addEventListener('submit', (evt) => {
  evt.preventDefault();
  nameProfile.textContent = usernameInput.value;
  jobProfile.textContent = jobInput.value;
  closePopup(popupEditProfile);
});

// закрытие popup редактирование  профиля
popupCloseEditProfile.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

//открытие popup добавления карточки
addCard.addEventListener('click', () => {
  openPopup(popupAddCard);
  formAddCard.reset();
});

//отправка данных для добавления карточки
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard({name: nameCard.value, link: linkCard.value});
  closePopup(popupAddCard);
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
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImg = cardElement.querySelector('.card__img');
  cardElement.querySelector('.card__title').textContent = item.name;
  cardImg.src = item.link;
  cardImg.alt = item.name;
  likeCard(cardElement.querySelector('.card__like'));
  deleteCard(cardElement.querySelector('.card__delete'));
  openCard(cardImg);
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
function openCard (open) {
  open.addEventListener('click', (evt) => {
    const imageCard = evt.target;
    popupImage.src = imageCard.src;
    popupFigcaption.textContent = imageCard.alt;
    openPopup(popupCard);
  });
}

