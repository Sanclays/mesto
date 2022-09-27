//данные с верстки
const profile = document.querySelector('.profile');
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__text');
const libraryContainer = document.querySelector('.library');

//popup редактирования профиля
const popupEditProfile = document.querySelector('.popup-edit-profile');
const profileEdit = document.querySelector('.profile__edit');
const popupCloseEditProfile = popupEditProfile.querySelector('.popup__close');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const usernameInput = formEditProfile.querySelector('#username');
const jobInput = formEditProfile.querySelector('#about');

//popup добавления карточки
const popupAddCard = document.querySelector('.popup-add-card')
const addCard = document.querySelector('.add-button');
const popupCloseAddCard = popupAddCard.querySelector('.popup__close');
const formAddCard = popupAddCard.querySelector('.popup__form');
const nameCard = formAddCard.querySelector('#name-card');
const linkCard = formAddCard.querySelector('#link-card');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
    alt: 'горы'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
    alt: 'озеро в лесу'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
    alt: 'жилой микрорайон'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
    alt: 'поле перед горой'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
    alt: 'железная дорога через лес'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
    alt: 'гора на побережье озера Байкал'
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
})

// закрытие popup добавления карточки
popupCloseAddCard.addEventListener('click', () => {
  closePopup(popupAddCard);
});

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

//создание элемента card
function createCard(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.querySelector('.card__img').src = item.link;
  cardElement.querySelector('.card__img').alt = item.alt;
  cardLike(cardElement.querySelector('.card__like'));
  cardDelete(cardElement.querySelector('.card__delete'));
  return cardElement;
}

//добавление элементов card в верстку
function renderCard (item) {
  libraryContainer.prepend(createCard(item));
}

//создание элементов card из массива
initialCards.forEach(card => renderCard(card));




