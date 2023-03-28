
const popupInfo = document.querySelector('.popup_type_info');
const popupAdd = document.querySelector('.popup_type_add');

const popupTypeImage = document.querySelector('.popup_type_image'); 
const popupImage = document.querySelector('.popup__image');
const popupImageTitle = document.querySelector('.popup__image-title');

const closeButtons = document.querySelectorAll('.popup__close');

const formElement = document.querySelector('.popup__container');
const formElementCard = document.querySelector('#add-form');
const nameInput = document.querySelector('#title');
const jobInput = document.querySelector('#description');
const nameAuthor = document.querySelector('.profile-info__author');
const jobAuthor = document.querySelector('.profile-info__description');

const linkNewPlace = document.querySelector('#place-link');
const nameNewPlace = document.querySelector('#place-title');

const editButton = document.querySelector('.profile__edit-button');
const addButton  = document.querySelector('.profile__add-button');

const sectionElements = document.querySelector('.elements');
const templateElements = document.querySelector('.elements-template').content;
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 

//         функция открытия попапа
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

//         функция закрытия попапа 

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

closeButtons.forEach(element => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(popup));
})

//         открытие попапа профиля 
function showPopupInfo() {
  nameInput.value = nameAuthor.textContent;
  jobInput.value = jobAuthor.textContent;

  openPopup(popupInfo);
}

//         открытие попапа добавления карточки
function showPopupAdd() {
  nameNewPlace.value = null;
  linkNewPlace.value = null;

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

function createCard(item) {
  const htmlElement = templateElements.querySelector('.element').cloneNode(true);

  htmlElement.querySelector('.element__text').textContent = item.name;
  htmlElement.querySelector('.element__photo').src = item.link;
  htmlElement.querySelector('.element__photo').alt = item.name;

  setEventListener(htmlElement);

  htmlElement.querySelector('.element__photo').addEventListener('click',() => showImagePopup(item))
  return htmlElement;
}

//           Создание карточек на странице из массива
initialCards.forEach(renderItem)

function renderItem(item) {

sectionElements.append(createCard(item));
}

//         Функция добавления новой карточки

function handleAddCard(evt) {
  evt.preventDefault();

  const item = { name: nameNewPlace.value, link: linkNewPlace.value};
  
  sectionElements.prepend(createCard(item));

  closePopup(popupAdd);

  sectionElements.querySelector('.element__photo').addEventListener('click',() => showImagePopup(item))
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
