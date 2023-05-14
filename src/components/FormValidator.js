class FormValidator {
    constructor(config, form) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._errorSelectorTemplate = config.errorSelectorTemplate;
      this._inputErrorClass = config.inputErrorClass;
      this._errorTextClass = config.errorTextClass;
      this._form = form;
      this._button = form.querySelector(this._submitButtonSelector);
      this._inputs = form.querySelectorAll(this._inputSelector);
    }
  
    
    _showInputError(errorTextElement, input) {
      input.classList.add(this._inputErrorClass);
      errorTextElement.textContent = input.validationMessage;
      errorTextElement.classList.add(this._errorTextClass);
    }
  
    _hideInputError(errorTextElement, input) {
      input.classList.remove(this._inputErrorClass);
      errorTextElement.textContent = '';
      errorTextElement.classList.add(this._errorTextClass);
    }
  
    _enableButton() {
      this._button.classList.remove(this._inactiveButtonClass);
      this._button.disabled = false;
  }
  
    _disabledButton( ) {
      this._button.classList.add( this._inactiveButtonClass);
      this._button.disabled = true;
  }
  
    _hasValidityInput() {
      return Array.from(this._inputs).some((input) => !input.validity.valid)
    }
  
  
    _changeButton() {
      if(this._hasValidityInput()) {
        this._disabledButton(this._button);
    } else {
        this._enableButton();
    }
    }
  
    _checkInputValidity(input) {
      const errorTextElement  = this._form.querySelector(`#${input.id}-error`);
      if (input.validity.valid) {
        this._hideInputError(errorTextElement, input) 
      } else {
        this._showInputError(errorTextElement,input);
      }
    }
  
    _setEventListener() {
      this._inputs.forEach(input => {
        input.addEventListener('input',() => {
          this._checkInputValidity(input);
          this._changeButton();
        })
      })
    }
  
    enableValidation() { 
      this._setEventListener();
    }
  
    resetErrorOpenForm() {
      this._inputs.forEach(input => {
        const errorTextElement = this._form.querySelector(`#${input.id}-error`)
          if(!input.validity.valid) {
              this._hideInputError(errorTextElement, input);
          }
      })
      this._disabledButton()
  }
  
  };

  export default FormValidator;