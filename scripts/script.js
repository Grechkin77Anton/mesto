
const popupInfo = document.querySelector('.info-popup');
const popupAdd = document.querySelector('.card-popup');

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

const popupImage = document.querySelector('.image-popup');

const closeButtons = document.querySelectorAll('.popup__close');

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

//   Создание карточек на странице из массива
initialCards.forEach(renderItem)

function renderItem(item) {
    const htmlElement = templateElements.cloneNode(true);

    htmlElement.querySelector('.element__text').textContent = item.name;
    htmlElement.querySelector('.element__photo').src = item.link;
    htmlElement.querySelector('.element__photo').alt = item.name;

    setEventListener(htmlElement);

    sectionElements.append(htmlElement);
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


//         Функция добавления новой карточки

function handleAddCard(evt) {
  evt.preventDefault();

  const item = { name: nameNewPlace.value, link: linkNewPlace.value};

  const htmlElement = templateElements.cloneNode(true);
    htmlElement.querySelector('.element__text').textContent = item.name;
    htmlElement.querySelector('.element__photo').src = item.link;
    htmlElement.querySelector('.element__photo').alt = item.name;

    setEventListener(htmlElement);

    sectionElements.prepend(htmlElement);

    closeButton();

    sectionElements.querySelector('.element__photo').addEventListener('click',() => showImagePopup(item))
}

//           Функция открытия попапа с картинкой

function showImagePopup(item) {
  console.log('1')
  // разбираем данные, кладём их в попап, открывает попап с картинкой
  popupImage.querySelector('.popup__image').src = item.link;
  console.log('2')
  popupImage.querySelector('.popup__image-title').textContent = item.name;
  console.log('3')
  popupImage.classList.add('popup_opened');
}

//            Набор функций для карточки

function setEventListener(htmlElement) {
  htmlElement.querySelector('.element__remove').addEventListener('click', handleDelete);
  htmlElement.querySelector('.element__like').addEventListener('click', handleLike);
}

//         закрытия попапа

const closeButton = () => {
    document.querySelector('.popup_opened').classList.remove('popup_opened');
};

//         открытие попапа профиля 

function showPopupInfo() {
    popupInfo.classList.add('popup_opened');
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
}

//         Функция редактирования информации профиля

function handleFormSubmit (evt) {
    evt.preventDefault();

        nameAuthor.textContent = nameInput.value;
        jobAuthor.textContent = jobInput.value;

        closeButton();
}

//         открытие попапа  добавления карточки

function showPopupAdd() {
  popupAdd.classList.add('popup_opened');
  nameNewPlace.value = null;
  linkNewPlace.value = null;
}



formElement.addEventListener('submit', handleFormSubmit);
formElementCard.addEventListener('submit', handleAddCard);

editButton.addEventListener('click', showPopupInfo);
addButton.addEventListener('click', showPopupAdd);

closeButtons.forEach((e) => e.addEventListener('click', closeButton));
// showImagePopup.forEach((e) => e.addEventListener('click', showImagePopup));