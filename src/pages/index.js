
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/userInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteCard from '../components/PopupDeleteCard.js';
import Api from '../components/Api.js';
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
  profileJobSelector: '.profile-info__description',
  profileAvatarSelector: '.profile__avatar'
};

const formInfoElement = document.forms.editForm;
const formAddCardElement = document.forms.addForm;
const formEditAvatarElement = document.forms.editAvatar;

const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  errorSelectorTemplate: 'popup__error_type_',
  inputErrorClass: 'popup__input_invalid',
  errorTextClass: 'popup__error_visible'
}

const popupEditAvatarSelector = '.popup_type_avatar';
const popupDeleteCardSelector = '.popup_type_delete';

let myid;

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'd71baa1f-8151-4635-9148-fe0661728bd9',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo(configData);

const imagePopup = new PopupWithImage(popupImageSelector);
imagePopup.setEventListeners()

const deleteCardPopup = new PopupDeleteCard(popupDeleteCardSelector, ({card, cardId}) => {
  api.deleteCard(cardId)
    .then(res => {
      card.removeCard()
      deleteCardPopup.close()
    })
    .catch((error) => console.error(`Ошибка удаления карточки ${error}`))
    .finally(() => deleteCardPopup.resetLoadText())
  
}) 

deleteCardPopup.setEventListeners();

const addCard = (cardData) => {
  const card = new Card (cardData, selectorTemplate, imagePopup.open, deleteCardPopup.open, (likeElement, cardId) => {
    if(likeElement.classList.contains('element__like_active')) {
      api.deleteLike(cardId)
      .then(res => {
        card.toggleLike(res.likes)
      }) 
      .catch((error) => console.error(`Ошибка снятия лайка ${error}`))
    } else {
      api.addCardLike(cardId)
      .then(res => {
        card.toggleLike(res.likes)
      })
      .catch((error) => console.error(`Ошибка лайка карточки ${error}`))
    }

  });
  return card.createCard();
}

const popupAddCard = new PopupWithForm(addCardPopupSelector, ({name:name , link:link}) => {
  api.addNewCard({name:name , link:link})
    .then(dataCard => {
      dataCard.myid = userInfo.getId()
      section.addItem(addCard(dataCard))
      popupAddCard.close();
    })
  .catch((error => console.error(`Ошибка при создании новой карточки ${error}`)))
  .finally(() => popupAddCard.resetLoadText())
  
})

popupAddCard.setEventListeners();

const section = new Section((card) => { 
    section.addAppendItems(addCard(card));
}, containerSelector) 
 

const popupProfile = new PopupWithForm(profilePopupSelector, (obj) => {
  api.setUserInfo(obj)
    .then(res => {
      userInfo.setUserInfo({ username: res.name, description: res.about, avatar: res.avatar}) 
      popupProfile.close()
})
      .catch((error => console.error(`Ошибка редактирования профиля ${error}`)))
      .finally(() => popupProfile.resetLoadText());
});

const popupEditAvatar = new PopupWithForm(popupEditAvatarSelector, (obj) => {
  api.setNewAvatar(obj)
    .then (res => {
      userInfo.setUserInfo({ username: res.name, description: res.about, avatar: res.avatar})
      popupEditAvatar.close()
    })
    .catch((error => console.error(`Ошибка редактирования аватара профиля ${error}`)))
    .finally(() => popupEditAvatar.resetLoadText());
})

popupEditAvatar.setEventListeners();


document.querySelector('.profile__avatar-button').addEventListener('click', () => {
  popupEditAvatar.open()
  formEditAvatarValidator.resetErrorOpenForm();
})


//         открытие попапа профиля 
function showPopupInfo() {

  formPersonalDataValidator.resetErrorOpenForm();
  popupProfile.setInputsValue(userInfo.getUserInfo());
  
  popupProfile.open();
}

popupProfile.setEventListeners()




//         открытие попапа добавления карточки

function showPopupAdd() {
  formAddCardValidator.resetErrorOpenForm();
  
 popupAddCard.open();
}

// Валидация форм

const formPersonalDataValidator = new FormValidator(configValidation, formInfoElement);
formPersonalDataValidator.enableValidation();

const formAddCardValidator = new FormValidator(configValidation, formAddCardElement);
formAddCardValidator.enableValidation();

const formEditAvatarValidator = new FormValidator(configValidation, formEditAvatarElement);
formEditAvatarValidator.enableValidation();

editButton.addEventListener('click', showPopupInfo);
addButton.addEventListener('click', showPopupAdd);


Promise.all([api.getInfo(), api.getCards()])
  .then(([dataUser, dataCard]) => {
    myid = dataUser._id;
    dataCard.forEach(item => item.myid = dataUser._id);
    userInfo.findId(dataUser._id)
    userInfo.setUserInfo({ username: dataUser.name, description: dataUser.about, avatar: dataUser.avatar});
    section.addCardFromArray(dataCard);
  })
  .catch((error => console.error(`Ошибка создания начальных карточек ${error}`)))