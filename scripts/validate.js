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

function enableValidation (config) {
    const forms = Array.from(document.querySelectorAll(config.formSelector));
    forms.forEach(form => {
        const inputs = form.querySelectorAll(config.inputSelector);
        const button = form.querySelector(config.submitButtonSelector);
        setEventListeners(inputs, button , config.errorSelectorTemplate, config.inactiveButtonClass, config.inputErrorClass, config.errorTextClass)
})
}

function setEventListeners(inputs, button, errorSelectorTemplate, inactiveButtonClass, inputErrorClass, errorTextClass) {
   inputs.forEach(input => {
    input.addEventListener('input', () => {
        checkInputValidity(input, errorSelectorTemplate, inputErrorClass, errorTextClass);
        changeButton(inputs, button, inactiveButtonClass);
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

function changeButton (inputs, button, inactiveButtonClass) {
    if(hasValidityInput(inputs)) {
        disabledButton(button, inactiveButtonClass);
    } else {
        enableButton(button, inactiveButtonClass);
    }
}

function hasValidityInput(inputs) {
    return Array.from(inputs).some((input) => !input.validity.valid)
}

function enableButton(button, inactiveButtonClass) {
    button.classList.remove(inactiveButtonClass);
    button.disabled = false;
}

function disabledButton(button, inactiveButtonClass) {
    button.classList.add(inactiveButtonClass);
    button.disabled = true;
}

function resetErrorOpenForm(form) {
    form.querySelectorAll(configValidation.inputSelector).forEach(input => {
        const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
        if(!input.validity.valid) {
            hideInputError(input, currentInputErrorContainer,config.inputErrorClass, config.errorTextClass)
        }
    })
}









