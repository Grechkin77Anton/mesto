import initialCards from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/userInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
// import './index.css';

const formElement = document.querySelector('.popup__container');
const formElementCard = document.querySelector('#add-form');

const editButton = document.querySelector('.profile__edit-button');
const addButton  = document.querySelector('.profile__add-button');

const selectorTemplate = '#template';
const profilePopupSelector = '.popup_type_info';
const addCardPopupSelector = '.popup_type_add';
const popupImageSelector = '.popup_type_image';
const containerSelector =  '.elements';
const configData = {
  profileNameSelector: '.profile-info__author',
  profileJobSelector: '.profile-info__description'
};

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

const userInfo = new UserInfo(configData);

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners()



const addCard = (cardData) => {
  const card = new Card (cardData, selectorTemplate, imagePopup.open);
  return card.createCard();
}

const section = new Section({ 
  items: initialCards, 
  renderer: (card) => { 
    section.addItem(addCard(card));
  } 
}, containerSelector) 


section.addCardFromArray();
 

const popupProfile = new PopupWithForm(profilePopupSelector, (obj) => {
  userInfo.setUserInfo({username:obj.username, description: obj.description});
  popupProfile.close()
});


//         открытие попапа профиля 
function showPopupInfo() {

  formPersonalDataValidator.resetErrorOpenForm();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  
  popupProfile.open();
}

popupProfile.setEventListeners()

const popupAddCard = new PopupWithForm(addCardPopupSelector, (obj) => {
  section.renderer({name:obj.name, link: obj.link});
  popupAddCard.close();
})

popupAddCard.setEventListeners();


//         открытие попапа добавления карточки

function showPopupAdd() {
  formAddCardValidator.resetErrorOpenForm();
  formAddCardElement.reset();
  
 popupAddCard.open();
}

// Валидация форм

const formPersonalDataValidator = new FormValidator(configValidation, formInfoElement);
formPersonalDataValidator.enableValidation();

const formAddCardValidator = new FormValidator(configValidation, formAddCardElement);
formAddCardValidator.enableValidation();




formElement.addEventListener('submit', popupProfile);
formElementCard.addEventListener('submit', popupAddCard);

editButton.addEventListener('click', showPopupInfo);
addButton.addEventListener('click', showPopupAdd);