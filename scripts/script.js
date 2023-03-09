// Находим форму в DOM
let popup = document.querySelector('.popup');
let formElement = document.querySelector('.popup__container'); // Воспользуйтесь методом querySelector()
let nameInput = document.querySelector('#title'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('#description');// Воспользуйтесь инструментом .querySelector()
let nameAuthor = document.querySelector('.profile-info__author');
let jobAuthor = document.querySelector('.profile-info__description');
let editButton = document.querySelector('.profile__edit-button');
let addButton  = document.querySelector('.profile__add-button');
let resetEditButton = document.querySelector('.popup__close');

function hidePopup() {
    popup.classList.remove('popup_opened');
}

function showPopup() {
    popup.classList.add('popup_opened');
    nameInput.value = nameAuthor.textContent;
    jobInput.value = jobAuthor.textContent;
}

function handleFormSubmit (evt) {
    evt.preventDefault();

        nameAuthor.textContent = nameInput.value;
        jobAuthor.textContent = jobInput.value;

        hidePopup();
}

formElement.addEventListener('submit',handleFormSubmit);
editButton.addEventListener('click',showPopup);
resetEditButton.addEventListener('click',hidePopup);
