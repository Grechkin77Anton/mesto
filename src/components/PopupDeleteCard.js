import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
    constructor(popupSelector,onSubmitFunction) {
        super(popupSelector);
        this._onSubmitFunction = onSubmitFunction;
        this._deleteCardButton = this._form.querySelector('.popup__button-delete');
        this._defaultTextButton = this._deleteCardButton.textContent;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault()
            this._deleteCardButton.textContent = "Удаление..."
            this._onSubmitFunction({card: this._card, cardId: this._cardId});
        })
    }

    resetLoadText() {
        this._deleteCardButton.textContent = this._defaultTextButton;
    }

    open = ({card, cardId}) => {
        super.open();
        this._card = card;
        this._cardId = cardId;
    }

} 