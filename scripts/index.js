const profile = document.querySelector('.profile');
const profileEdit = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const popupClose = document.querySelector('.popup__close');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about');
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

//функция переключения Popup`a методом скрытия
function togglePopupClass() {
  popup.classList.toggle('popup_opened');
}

// открытие popup
function addPopupClass() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;
  togglePopupClass();
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;
  togglePopupClass();
}

profileEdit.addEventListener('click', addPopupClass);

// // закртитие popup
popupClose.addEventListener('click', togglePopupClass);

// отправка изменений профиля на web
formElement.addEventListener('submit', formSubmitHandler);

//создание элементов card из массива
initialCards.forEach(function(item) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__img').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;
  libraryContainer.append(cardElement);
})