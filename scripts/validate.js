// Функция, добавления класса с ошибкой
function showInputError(formElement, inputElement, objectSelectors) {
	const inputError = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(objectSelectors.inputErrorClass);
	inputError.textContent = inputElement.validationMessage;
	inputError.classList.add(objectSelectors.errorClass);
}

// Функция, удаления класса с ошибкой
function hideInputError(formElement, inputElement, objectSelectors) {
	const inputError = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(objectSelectors.inputErrorClass);
	inputError.classList.remove(objectSelectors.errorClass);
	inputError.textContent = '';
}

// Функция, меняет статус кнопки
function toggleButtonState (inputList, buttonElement, objectSelectors) {
	const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
	if (hasInvalidInput) {
		buttonElement.setAttribute("disabled", true);
		buttonElement.classList.add(objectSelectors.inactiveButtonClass);
	} else {
		buttonElement.removeAttribute("disabled");
		buttonElement.classList.remove(objectSelectors.inactiveButtonClass);
	}
}

// Функция, которая проверяет валидность поля
function isValid(formElement, inputElement, objectSelectors) {
	if (inputElement.validity.valid) {
		hideInputError(formElement, inputElement, objectSelectors);
	} else {
		showInputError(formElement, inputElement, objectSelectors);
	}
}

// функция, навешивает слушатели выполняющие валидацию
function setEventListeners (formElement, objectSelectors) {

	const inputList = Array.from(formElement.querySelectorAll(objectSelectors.inputSelector));
	const submitButton = formElement.querySelector(objectSelectors.submitButtonSelector);

	formElement.addEventListener('submit', (event) => {
		event.preventDefault();
		formElement.reset();
		toggleButtonState(inputList, submitButton, objectSelectors);
	});

	toggleButtonState(inputList, submitButton, objectSelectors);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement, objectSelectors);
			toggleButtonState(inputList, submitButton, objectSelectors);
		})
	})
}

// Функция, навешивает на все формы валидацию
function enableValidation (objectSelectors) {
	const formList = Array.from(document.querySelectorAll(objectSelectors.formSelector));
	formList.forEach((formElement) => {
		setEventListeners(formElement, objectSelectors);
	})
}

enableValidation({
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
});