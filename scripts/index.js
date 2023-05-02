import initialCards from './constants.js';

import Card from './card.js';


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

const selectorTemplate = '#template';

const formInfoElement = document.forms.editForm;
const formAddCardElement = document.forms.addForm;

const buttonForFormInfoElement = formInfoElement.querySelector('.popup__button');
const inputListForFormInfoElement = formInfoElement.querySelectorAll('.popup__input');
const buttonForFormAddCard = formAddCardElement.querySelector('.popup__button');
const inputListForFormAddCard = formAddCardElement.querySelectorAll('.popup__input');

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorSelectorTemplate: 'popup__error_type_',
  inputErrorClass: 'popup__input_invalid',
  errorTextClass: 'popup__error_visible'
}



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
  // resetErrorOpenForm(formInfoElement);
  
  nameInput.value = nameAuthor.textContent; 
  jobInput.value = jobAuthor.textContent;
  // changeButton(inputListForFormInfoElement, buttonForFormInfoElement, configValidation.inactiveButtonClass)

  openPopup(popupInfo);
}

//         открытие попапа добавления карточки
function showPopupAdd() {
  // resetErrorOpenForm(formAddCardElement);

  formAddCardElement.reset();
  
  // changeButton(inputListForFormAddCard, buttonForFormAddCard, configValidation.inactiveButtonClass )

  openPopup(popupAdd);
}

//           Функция открытия попапа с картинкой
function showImagePopup(item) {
  // разбираем данные, кладём их в попап, открывает попап с картинкой
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupImageTitle.textContent = item.name;

  openPopup(popupTypeImage);
}

//       функция создания карточен

function createNewCard(element) {
  const card = new Card(element, selectorTemplate, showImagePopup);
  const cardElement = card.createCard();

  return cardElement;
}

function addCard(container, card) {
  container.prepend(card);
}

//           Создание карточек на странице из массива
initialCards.forEach(element => {
  
  addCard(sectionElements, createNewCard(element));
})


//         Функция добавления новой карточки

function handleAddCard(evt) {
    evt.preventDefault();

  const item = { name: nameNewPlace.value, link: linkNewPlace.value};
  addCard(sectionElements, createNewCard(item));

  closePopup(popupAdd);
}

//         Функция редактирования информации профиля

function handleFormProfileInfoSubmit (evt) {
    evt.preventDefault();

        nameAuthor.textContent = nameInput.value;
        jobAuthor.textContent = jobInput.value;

        closePopup(popupInfo);
}


// const configValidation = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   errorSelectorTemplate: 'popup__error_type_',
//   inputErrorClass: 'popup__input_invalid',
//   errorTextClass: 'popup__error_visible'
// }




class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._errorSelectorTemplate = config.errorSelectorTemplate;
    this._inputErrorClass = config.inputErrorClass;
    this._errorTextClass = config.errorTextClass;
    this._form = form;
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

  _disabledButton(button) {
    button.classList.add( this._inactiveButtonClass);
    button.disabled = true;
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
    this._button = this._form.querySelector(this._submitButtonSelector);
    this._inputs = this._form.querySelectorAll(this._inputSelector);
    this._setEventListener();
  }
};

const FormPersonalDataValidator = new FormValidator(configValidation, formInfoElement);
FormPersonalDataValidator.enableValidation();

const FormAddCardValidator = new FormValidator(configValidation, formAddCardElement);
FormAddCardValidator.enableValidation();





formElement.addEventListener('submit', handleFormProfileInfoSubmit);
formElementCard.addEventListener('submit', handleAddCard);

editButton.addEventListener('click', showPopupInfo);
addButton.addEventListener('click', showPopupAdd);