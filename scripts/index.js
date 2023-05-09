import initialCards from './constants.js';

import Card from './Card.js';

import FormValidator from './FormValidator.js'


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

  FormPersonalDataValidator.resetErrorOpenForm();

  nameInput.value = nameAuthor.textContent; 
  jobInput.value = jobAuthor.textContent;

  openPopup(popupInfo);
}

//         открытие попапа добавления карточки
function showPopupAdd() {
  FormAddCardValidator.resetErrorOpenForm();
  formAddCardElement.reset();
  
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


const FormPersonalDataValidator = new FormValidator(configValidation, formInfoElement);
FormPersonalDataValidator.enableValidation();

const FormAddCardValidator = new FormValidator(configValidation, formAddCardElement);
FormAddCardValidator.enableValidation();




formElement.addEventListener('submit', handleFormProfileInfoSubmit);
formElementCard.addEventListener('submit', handleAddCard);

editButton.addEventListener('click', showPopupInfo);
addButton.addEventListener('click', showPopupAdd);