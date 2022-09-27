//данные с верстки
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__text');
const libraryContainer = document.querySelector('.library');

//popup редактирования профиля
const popupEditProfile = document.querySelector('.popup_edit-profile');
const profileEdit = document.querySelector('.profile__edit');
const popupCloseEditProfile = popupEditProfile.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const usernameInput = formEditProfile.querySelector('#username');
const jobInput = formEditProfile.querySelector('#about');

//popup добавления карточки
const popupAddCard = document.querySelector('.popup_add-card')
const addCard = document.querySelector('.add-button');
const popupCloseAddCard = popupAddCard.querySelector('.popup__close');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameCard = formAddCard.querySelector('#name-card');
const linkCard = formAddCard.querySelector('#link-card');

//popup зума изображения
const popupCard = document.querySelector('.popup_open-card');
const popupCloseCard = popupCard.querySelector('.popup__close');
const popupImage = popupCard.querySelector('.popup__image');
const popupFigcaption = popupCard.querySelector('.popup__figcaption');



const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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
  nameCard.value = "";
  linkCard.value = "";
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
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__img').src = item.link;
  cardElement.querySelector('.card__img').alt = item.name;
  cardLike(cardElement.querySelector('.card__like'));
  cardDelete(cardElement.querySelector('.card__delete'));
  cardOpen(cardElement.querySelector('.card__img'));
  return cardElement;
}

//добавление элементов card в верстку
function renderCard (item) {
  libraryContainer.prepend(createCard(item));
}

//создание элементов card из массива
initialCards.forEach(card => renderCard(card));


//обработка клика на лайк
function cardLike (button) {
  button.addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active')
  });
}

//обработка клика на корзину
function cardDelete (button) {
  button.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove()
  });
}

//обработка клика на изображение
function cardOpen (open) {
  open.addEventListener('click', (evt) => {
    const imageCard = evt.target;
    popupImage.src = imageCard.src;
    popupFigcaption.textContent = imageCard.alt;
    openPopup(popupCard);
  });
}

