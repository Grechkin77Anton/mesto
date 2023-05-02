class Card {
    constructor(item, selectorTemplate, showImagePopup) {
      this._item = item;
      this._name = item.name;
      this._link = item.link;
      this._selectorTemplate = selectorTemplate;
      this._showImagePopup = showImagePopup;
    }
  
    _getTemplateClone() {
      return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
    }
  
    _handleLike = () => {
      this._likeIconElement.classList.toggle('element__like_active');
    }
  
    _handleDeleteElement = () => {
      this._cloneElement.remove();
      this._cloneElement = null;
    }
  
    _handleShowPopupImage = () => {
      this._showImagePopup(this._item);
    }
  
    _setEventListeners() {
      this._likeIconElement.addEventListener('click', this._handleLike);
      this._removeElement.addEventListener('click', this._handleDeleteElement);
      this._imageElement.addEventListener('click', this._handleShowPopupImage);
    }
  
    createCard() {
      this._cloneElement = this._getTemplateClone();
      this._imageElement = this._cloneElement.querySelector('.element__photo');
      this._likeIconElement = this._cloneElement.querySelector('.element__like');
      this._removeElement = this._cloneElement.querySelector('.element__remove');
      this._subtitle = this._cloneElement.querySelector('.element__text');
      this._imageElement.src = this._link;
      this._imageElement.alt = this._name;
      this._subtitle.textContent = this._name;
      this._setEventListeners();
      return this._cloneElement;
    }
    
  }

  export default Card;
