class Card {
    constructor(item, selectorTemplate, showImagePopup, deleteCardPopup, activeLike) {
      this._item = item;
      this._name = item.name;
      this._link = item.link;
      
      this._myId = item.myid;
      this._ownerId = item.owner._id;
      this._cardId = item._id;

      this._likes = item.likes;
      this._likeLength = item.likes.length;

      this._activeLike = activeLike;

      this._selectorTemplate = selectorTemplate;
      this._showImagePopup = showImagePopup;
      this._deleteCardPopup = deleteCardPopup;

    }


    _visibleForRemoveButton() {
      if(this._myId !== this._ownerId) {
        this._removeElement.classList.add('element__remove-disabled')
      }
    }

    _likeActiveCheck() {
      const checkMyUser = this._likes.some(user => user._id === this._myId)
      if(checkMyUser) {
        this._likeIconElement.classList.toggle('element__like_active');
      }
    this._counter.textContent = this._likeLength;

  }
  
    _getTemplateClone() {
      return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
    }

    toggleLike(like) {
      this._likeIconElement.classList.toggle('element__like_active');
      this._counter.textContent = like.length;
    }
  
    _handleLike = () => {
      this._activeLike(this._likeIconElement, this._cardId);
    }
  
    _handleDeleteElement = () => {
      this._deleteCardPopup({card: this, cardId: this._cardId});
    }
  
    _handleShowPopupImage = () => {
      this._showImagePopup(this._item);
    }
  
    _setEventListeners() {
      this._likeIconElement.addEventListener('click', this._handleLike);
      this._removeElement.addEventListener('click', this._handleDeleteElement);
      this._imageElement.addEventListener('click', this._handleShowPopupImage);
    }

    removeCard() {
      this._cloneElement.remove();
      this._cloneElement = null;
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
      this._counter = this._cloneElement.querySelector('.element__counter');
      this._setEventListeners();
      this._visibleForRemoveButton();
      this._likeActiveCheck()


      return this._cloneElement;
    }
    
  }

  export default Card;
