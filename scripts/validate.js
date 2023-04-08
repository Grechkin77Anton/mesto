const configValidation = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    errorSelectorTemplate: 'popup__error_type_',
    inputErrorClass: 'popup__input_invalid',
    errorTextClass: 'popup__error_visible'
}

enableValidation(configValidation);

function enableValidation ({formSelector, inputSelector, submitButtonSelector, ...rest}) {
    const forms = Array.from(document.querySelectorAll(formSelector));
    forms.forEach(form => {
        const inputs = form.querySelectorAll(inputSelector);
        const button = form.querySelector(submitButtonSelector);
        setEventListeners(inputs, button , rest);
})
}

function setEventListeners(inputs, button, {errorSelectorTemplate,inputErrorClass, errorTextClass, ...rest}) {
   inputs.forEach(input => {
    input.addEventListener('input', () => {
        checkInputValidity(input, errorSelectorTemplate, inputErrorClass, errorTextClass);
        changeButton(inputs, button, rest.inactiveButtonClass);
    })
   })
}

function checkInputValidity(input , errorSelectorTemplate, inputErrorClass, errorTextClass) {
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`);
    if(input.validity.valid) {
        hideInputError(input,currentInputErrorContainer,inputErrorClass,errorTextClass)
    } else {
        showInputError(input,currentInputErrorContainer,inputErrorClass,errorTextClass)
    }
}

//           скрытие текста ошибок валидации

function hideInputError(input,currentInputErrorContainer,inputErrorClass,errorTextClass) {
    input.classList.remove(inputErrorClass);
    currentInputErrorContainer.textContent = '';
    currentInputErrorContainer.classList.remove(errorTextClass);
}

function showInputError(input,currentInputErrorContainer,inputErrorClass,errorTextClass) {
    input.classList.add(inputErrorClass);
    currentInputErrorContainer.textContent = input.validationMessage;
    currentInputErrorContainer.classList.add(errorTextClass);
}

//            Изменение активности кнопки

function changeButton (inputs, button, inactiveButtonClass) {
    if(hasValidityInput(inputs)) {
        disabledButton(button, inactiveButtonClass);
    } else {
        enableButton(button, inactiveButtonClass);
    }
}

//      проверка импутов на валидность

function hasValidityInput(inputs) {
    return Array.from(inputs).some((input) => !input.validity.valid)
}

//                  кнопки

function enableButton(button, inactiveButtonClass) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
}

function disabledButton(button, inactiveButtonClass) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
}

// функция сброса ошибок при открытии попапа

function resetErrorOpenForm(form) {
    form.querySelectorAll(configValidation.inputSelector).forEach((input) => {
        const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
        if(!input.validity.valid) {
            hideInputError(input, currentInputErrorContainer,configValidation.inputErrorClass, configValidation.errorTextClass)
        }
    })
}









