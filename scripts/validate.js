// Функция, добавления класса с ошибкой
function showInputError(formElement, inputElement, validationConfig) {
	const inputError = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(validationConfig.inputErrorClass);
	inputError.textContent = inputElement.validationMessage;
	inputError.classList.add(validationConfig.errorClass);
}

// Функция, удаления класса с ошибкой
function hideInputError(formElement, inputElement, validationConfig) {
	const inputError = formElement.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(validationConfig.inputErrorClass);
	inputError.classList.remove(validationConfig.errorClass);
	inputError.textContent = '';
}

// Функция,отключения статуса кнопки
function disabledButtonSubmit (buttonElement) {
	buttonElement.removeAttribute("disabled");
	buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

// Функция, меняет статус кнопки
function toggleButtonState (inputList, buttonElement, validationConfig) {
	const hasInvalidInput = inputList.some(inputElement => !inputElement.validity.valid);
	if (hasInvalidInput) {
		buttonElement.setAttribute("disabled", true);
		buttonElement.classList.add(validationConfig.inactiveButtonClass);
	} else {
		buttonElement.removeAttribute("disabled");
		buttonElement.classList.remove(validationConfig.inactiveButtonClass);
	}
}

// Функция, которая проверяет валидность поля
function isValid(formElement, inputElement, validationConfig) {
	if (inputElement.validity.valid) {
		hideInputError(formElement, inputElement, validationConfig);
	} else {
		showInputError(formElement, inputElement, validationConfig);
	}
}

// функция, навешивает слушатели выполняющие валидацию
function setEventListeners (formElement, validationConfig) {

	const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
	const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

	formElement.addEventListener('submit', (event) => {
		event.preventDefault();
		formElement.reset();
		toggleButtonState(inputList, submitButton, validationConfig);
	});

	toggleButtonState(inputList, submitButton, validationConfig);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			isValid(formElement, inputElement, validationConfig);
			toggleButtonState(inputList, submitButton, validationConfig);
		})
	})
}

// Функция, навешивает на все формы валидацию
function enableValidation (validationConfig) {
	const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
	formList.forEach((formElement) => {
		setEventListeners(formElement, validationConfig);
	})
}

enableValidation(validationConfig);