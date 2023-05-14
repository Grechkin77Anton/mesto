import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._imagePopup = this._popup.querySelector('.popup__image');
        this._imagePopupTitle = this._popup.querySelector('.popup__image-title')
    }

    open = (item) => {
        this._imagePopup.src = item.link;
        this._imagePopup.alt = item.title;
        this._imagePopupTitle.textContent = item.title;

        super.open()
    }
}