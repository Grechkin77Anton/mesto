// Находим форму в DOM
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()
let nameInput = document.querySelector('.popup__author'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('.popup__description');// Воспользуйтесь инструментом .querySelector()
let nameAuthor = document.querySelector('.profile-info__author');
let jobAuthor = document.querySelector('.profile-info__description');
let formSubmit = document.querySelector('.popup__button-save');
let editButton = document.querySelector('.profile__edit-button');
let addButton  = document.querySelector('.profile__add-button');
let reserEditButton = document.querySelector('.popup__close');


function handleFormSubmit (evt) {
    evt.preventDefault();

        nameAuthor.textContent = nameInput.value;
        jobAuthor.textContent = jobInput.value;

        hidePopup();
}

formElement.addEventListener('submit',handleFormSubmit);

function showPopup() {
    popup.classList.add('popup__opened');
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
}

function hidePopup() {
    popup.classList.remove('popup__opened');
}

editButton.addEventListener('click',showPopup);
reserEditButton.addEventListener('click',hidePopup);
