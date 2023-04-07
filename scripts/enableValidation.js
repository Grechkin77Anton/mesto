enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

console.log(form)

const enableValidation = () => {
    form.addEventListener('submut', (evt) => {
        evt.preventDefault()
    })
    setEventListeners(form);
}

const setEventListeners = (formValidate) => {
    const formInputs = Array.from(formValidate.querySelectorAll('.popup__input'))
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            checkInputValidity(input);
        }) 
    })
}

const checkInputValidity = (input) => {
    const currentInputErrorContainer = document.querySelector(`#${input.id}-error`)
    if(input.checkValidity()) {
        currentInputErrorContainer.textContent = ''
    } else {
        currentInputErrorContainer.textContent = input.validationMessage;
    }
}

const enableButton = (button) => {
    button.classList.remove('popup__button_disabled');
    button.setAttribute('disabled', true);
}

const disabledButton = () => {
    button.classList.add('popup__button_disabled');
    button.removeAttribute('disabled');
}


enableValidation()