import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitFunction) {
        super(popupSelector);
        this._submitFunction = submitFunction;
        this._form = this._popup.querySelector('.popup__form');
        this._inputList =  this._form.querySelectorAll('.popup__input');
        this._submitLoadButton = this._form.querySelector('.popup__button');
        this._defaultTextButton = this._submitLoadButton.textContent;
    }

    _getInputsValue() {
        this._values = {};
        this._inputList.forEach(input => {
            this._values[input.name] = input.value
        });
        return this._values;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault(evt);
            this._submitLoadButton.textContent = "Сохранение..."
            this._submitFunction(this._getInputsValue())
        })
    }

    setInputsValue(inputData) {
        this._inputList.forEach(input => {
            input.value = inputData[input.name]
        })
    }

    resetLoadText() {
        this._submitLoadButton.textContent = this._defaultTextButton;
    }

    close() {
        super.close();
        this._form.reset();
    }
}

