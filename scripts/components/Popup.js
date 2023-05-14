export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButtonPopup = this._popup.querySelector('.popup__close')
    }

    _handleClickOnEsc = (event) => {
        if (event.key === 'Escape') {
            this.close()
        }
    }

    _handleCloseButton = () => {
        this.close()
    }

    _handleClickOnOverlay = (event) => {
        if (event.target !== event.currentTarget) {
            return;
        }
        this.close();
    
    }

    setEventListeners() {
        this._closeButtonPopup.addEventListener('click',this._handleCloseButton);
        this._popup.addEventListener('click', this._handleClickOnOverlay);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleClickOnEsc);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleClickOnEsc);
    }

}

