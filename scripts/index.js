import initialCards from './cards.js';


const popupElements = document.querySelectorAll('.popup');
const popupInfo = document.querySelector('.popup_type_info');
const popupAdd = document.querySelector('.popup_type_add');

const popupTypeImage = document.querySelector('.popup_type_image'); 
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

const closeButtons = document.querySelectorAll('.popup__close');

const formElement = document.querySelector('.popup__container');
const formElementCard = document.querySelector('#add-form');
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#description');
const nameAuthor = document.querySelector('.profile-info__author');
const jobAuthor = document.querySelector('.profile-info__description');

const linkNewPlace = document.querySelector('#place-link');
const nameNewPlace = document.querySelector('#place-title');

const editButton = document.querySelector('.profile__edit-button');
const addButton  = document.querySelector('.profile__add-button');

const sectionElements = document.querySelector('.elements');
const templateElements = document.querySelector('.elements-template').content;

const selectorTemplate = '#template';

const formInfoElement = document.forms.editForm;
const formAddCardElement = document.forms.addForm;

const buttonForFormInfoElement = formInfoElement.querySelector('.popup__button');
const inputListForFormInfoElement = formInfoElement.querySelectorAll('.popup__input');
const buttonForFormAddCard = formAddCardElement.querySelector('.popup__button');
const inputListForFormAddCard = formAddCardElement.querySelectorAll('.popup__input');


//         функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupClickOnEsc);
};

//         функция закрытия попапа 

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupClickOnEsc);
};

closeButtons.forEach(element => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(popup));
})

// закрытие попапа по клику на оверлэй

const closePopupByClickOnOverlay = function(event) {
  if (event.target !== event.currentTarget) {
    return;
  }
  closePopup(event.currentTarget);
}

popupElements.forEach((element) => {
 element.addEventListener('click', closePopupByClickOnOverlay);
})

//закрытие попапа на Escape

function closePopupClickOnEsc(event) {
  if (event.key === 'Escape') {
    const openPopup = document.querySelector('.popup_opened');
    closePopup(openPopup);
  }
}

//         открытие попапа профиля 
function showPopupInfo() {
  resetErrorOpenForm(formInfoElement);
  
  nameInput.value = nameAuthor.textContent; 
  jobInput.value = jobAuthor.textContent;
  changeButton(inputListForFormInfoElement, buttonForFormInfoElement, configValidation.inactiveButtonClass)

  openPopup(popupInfo);
}

//         открытие попапа добавления карточки
function showPopupAdd(e) {
  resetErrorOpenForm(formAddCardElement);

  formAddCardElement.reset();
  
  changeButton(inputListForFormAddCard, buttonForFormAddCard, configValidation.inactiveButtonClass )

  openPopup(popupAdd);
}

//           Функция открытия попапа с картинкой
function showImagePopup(icardData) {
  // разбираем данные, кладём их в попап, открывает попап с картинкой
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageTitle.textContent = cardData.name;

  openPopup(popupTypeImage);
}

//       функция создания карточен

// function createCard(item) {
//   const htmlElement = templateElements.querySelector('.element').cloneNode(true);

//   htmlElement.querySelector('.element__text').textContent = item.name;
//   htmlElement.querySelector('.element__photo').src = item.link;
//   htmlElement.querySelector('.element__photo').alt = item.name;

//   setEventListener(htmlElement);

//   htmlElement.querySelector('.element__photo').addEventListener('click',() => showImagePopup(item))
//   return htmlElement;
// }

class Card {
  constructor(cardData, selectorTemplate, showImagePopup) {
    this._cardData = cardData;
    this._name = cardData.name;
    this._link = cardData.link;
    this._selectorTemplate = selectorTemplate;
    this._showImagePopup = showImagePopup;
  }

  _getTemplateClone() {
    return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
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
    return this._cloneElement
  }

}


function addCard(place, card) {
  place.prepend(card);
}

//           Создание карточек на странице из массива
initialCards.forEach(element => {
  const card = new Card(element, selectorTemplate, showImagePopup);
  console.log(card);
  addCard(sectionElements, card.createCard());
})

// function renderItem(item) {

// sectionElements.append(createCard(item));
// }

//         Функция добавления новой карточки

function handleAddCard() {

  const item = { name: nameNewPlace.value, link: linkNewPlace.value};
  
  sectionElements.prepend(createCard(item));

  closePopup(popupAdd);
}

//             Удаление карточек

function handleDelete (event) {
  const card = event.target.closest('.element');
  card.remove();
}

function handleLike(event) {
  const like = event.target.closest('.element__like');
  like.classList.toggle('element__like_active');
}

//            Набор функций для карточки

function setEventListener(htmlElement) {
  htmlElement.querySelector('.element__remove').addEventListener('click', handleDelete);
  htmlElement.querySelector('.element__like').addEventListener('click', handleLike);
}

//         Функция редактирования информации профиля

function handleFormProfileInfoSubmit (evt) {
    evt.preventDefault();

        nameAuthor.textContent = nameInput.value;
        jobAuthor.textContent = jobInput.value;

        closePopup(popupInfo);
}

formElement.addEventListener('submit', handleFormProfileInfoSubmit);
formElementCard.addEventListener('submit', handleAddCard);

editButton.addEventListener('click', showPopupInfo);
addButton.addEventListener('click', showPopupAdd);