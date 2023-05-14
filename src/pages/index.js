import initialCards from '../utils/constants.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/userInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import '../pages/index.css';

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


const section = new Section({
  items: initialCards,
  renderer: (element) => {
    const card = new Card(element, selectorTemplate, imagePopup.open);
    const cardElement = card.createCard();
    return cardElement;
  }
}, containerSelector)

section.addCardFromArray();


const popupProfile = new PopupWithForm(profilePopupSelector, (evt) => {
  evt.preventDefault(evt);
  userInfo.setUserInfo(popupProfile._getInputsValue());
  popupProfile.close()
});

//         открытие попапа профиля 
function showPopupInfo() {

  FormPersonalDataValidator.resetErrorOpenForm();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  
  popupProfile.open();
}

popupProfile.setEventListeners()

const popupAddCard = new PopupWithForm(addCardPopupSelector, (evt) => {
  evt.preventDefault(evt);
  section.addItem(section.renderer(popupAddCard._getInputsValue()));
  popupAddCard.close();
})

popupAddCard.setEventListeners();


//         открытие попапа добавления карточки

function showPopupAdd() {
  FormAddCardValidator.resetErrorOpenForm();
  formAddCardElement.reset();
  
 popupAddCard.open();
}

// Валидация форм

const FormPersonalDataValidator = new FormValidator(configValidation, formInfoElement);
FormPersonalDataValidator.enableValidation();

const FormAddCardValidator = new FormValidator(configValidation, formAddCardElement);
FormAddCardValidator.enableValidation();




formElement.addEventListener('submit', popupProfile);
formElementCard.addEventListener('submit', popupAddCard);

editButton.addEventListener('click', showPopupInfo);
addButton.addEventListener('click', showPopupAdd);