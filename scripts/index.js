const profile = document.querySelector('.profile');
const profileEdit = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const popupClose = document.querySelector('.popup__close');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about');
const nameProfile = profile.querySelector('.profile__title');
const jobProfile = profile.querySelector('.profile__text');

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