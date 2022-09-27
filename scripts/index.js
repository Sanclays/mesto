const profile = document.querySelector('.profile');
const profileEdit = document.querySelector('.profile__edit');
const addCard = document.querySelector('.add-button');
const popupEditProfile = document.querySelector('.popup-edit-profile');
const popupAddCard = document.querySelector('.popup-add-card')
const popupCloseEditProfile = popupEditProfile.querySelector('.popup__close');
const popupCloseAddCard = popupAddCard.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const usernameInput = formEditProfile.querySelector('#username');
const jobInput = formEditProfile.querySelector('#about');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameCard = formAddCard.querySelector('#name-card');
const linkCard = formAddCard.querySelector('#link-card');
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__text');
const libraryContainer = document.querySelector('.library');

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
  nameCard.value= "";
  linkCard.value = "";
  openPopup(popupAddCard);
});

//отправка данных для добавления карточки
formAddCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  closePopup(popupAddCard);
})

// закрытие popup добавления карточки
popupCloseAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

//создание элементов card из массива
initialCards.forEach(function(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__like').addEventListener('click',  function  (evt) {
    evt.target.classList.toggle('card__like_active')
  });
  libraryContainer.append(cardElement);
});

