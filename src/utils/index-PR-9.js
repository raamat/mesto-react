import {
  profileAvatar, 
  profileEditAvatarButton,
  formAvatar,
  popupInputLinkAvatar,
  profileEditButton,
  popupInputName,
  popupInputJob,
  formEditProfile,
  profileAddButton,
  formAddCard,
  validationConfig } from '../utils/constants.js';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';

import './index.css';

let userId;

const popupConfirmation = new PopupWithConfirmation('.popup_type_delete-card');

/**
 * Функция создания карточки
 * @returns {HTMLElement}
 */
function createCard(data) {
  const card = new Card({
    data,
    handleCardClick: (link, name) => {
      showPopupPhoto.open(link, name); 
    },
    handleDeleteIconClick: (cardId) => {
      popupConfirmation.updateSubmitHandler(() => {
        popupConfirmation.setLoading(true);
        api.deleteCardServer(cardId)
          .then(() => {
            card.delete();
            popupConfirmation.close();
          })
          .finally(() => popupConfirmation.setLoading());
      })
      popupConfirmation.open()
    },
    handleLikeClick: (cardId, isLiked) => {
      api.setLikeCard(cardId, !isLiked).then((newCard) => {
        card.setLike(!isLiked);
        card.setLikeCount(newCard.likes.length);
      });
    }, userId 
    },
    '#card-template');
  const cardElement = card.generateCard();
  return cardElement;
}

// Класс 'Section' отвечает за отрисовку элементов на странице
const cardsList = new Section({
    renderer: (cardItem) => {
      // инструкция по работе с Card, либо другая
      cardsList.addItem(createCard(cardItem));
    }
  },
  '.cards__list'
)

// Создание попапа с картинкой
const showPopupPhoto = new PopupWithImage('.popup_type_zoom-photo');
const profileUserInfo = new UserInfo({
  profileTitleSelector: '.profile__title',
  profileSubtitleSelector: '.profile__subtitle'
});

// Включаем валидацию форм - вызываем публичный метод enableValidation
const formAddValidation = new FormValidator(validationConfig, formAddCard);
formAddValidation.enableValidation();

const formEditValidation = new FormValidator(validationConfig, formEditProfile);
formEditValidation.enableValidation();

const formAvatarValidation = new FormValidator(validationConfig, formAvatar);
formAvatarValidation.enableValidation();

// Обновление аватара
const showPopupAvatar = new PopupWithForm('.popup_type_edit-avatar', handleFormEditAvatarSubmit);

function handleFormEditAvatarSubmit() {
  showPopupAvatar.setLoading(true);
  api.updateAvatarServer(popupInputLinkAvatar.value)
    .then(res => {
      updateAvatar(res.avatar);
      showPopupAvatar.close();
    })
    .finally(() => showPopupAvatar.setLoading());
}

// Слушаетель кнопки "Редактировать аватар"
profileEditAvatarButton.addEventListener('click', handleProfileAvatarButtonClick)

function handleProfileAvatarButtonClick() {
  // Открываем попап
  showPopupAvatar.open();
}

// Сохранение данных из формы редактирования профиля
/**
 * В обработчик в качестве аргрумента передаем объект с полями формы
 * @param {{ name: string, job: string }} inputValues;
 */
function handleFormEditSubmit(inputValues) {
  showPopupProfile.setLoading(true);

  // Подставляем данные пользователя из объекта inputValues в форму
  //profileUserInfo.setUserInfo(inputValues);
  api.setUserInfoServer(inputValues)
    // При ОК публикуем изменения в профиль, чтобы отображались без перезагрузки страницы
    .then(data => {
      profileUserInfo.setUserInfo(data);
      // Попап закроется только при успешном сохранении изменений на сервере
      showPopupProfile.close();
    })
    // При любом раскладе меняем текст кнопки на "Сохранение"
    .finally(() => showPopupProfile.setLoading());
}

const showPopupProfile = new PopupWithForm('.popup_type_edit-profile', handleFormEditSubmit);

// Слушатель события клик по кнопке "Редактировать профиль"
profileEditButton.addEventListener('click', handleProfileEditButtonClick);

function handleProfileEditButtonClick() {
  // Очищаем поля ввода от ошибок
  formEditValidation.clearInputsErrors();
  // Открываем попап
  showPopupProfile.open();
  // Получаем объект с полями name и job
  const inputs = profileUserInfo.getUserInfo();
  // Вставляем значения в инпуты формы
  popupInputName.value = inputs.name;
  popupInputJob.value = inputs.job;
}

/****************************** Добавление карточки *******************************/
/**
 * В обработчик в качестве аргрумента передаем объект с полями формы
 * @param {{ place: string, link: string }} inputValues;
 */
function handleFormAddCardSubmit({ link, place }) {
  showPopupCard.setLoading(true);
  api.setCardServer({ name: place, link })
    // После того как карточка удачно улетит на сервер (status 200),
    // публикуем карточку в DOM, чтобы она отображалась без перезагрузки страницы
    .then(data => {
      cardsList.addItem(createCard(data), true);
      // Закрываем форму только после того, как карточка успешно добавлена
      showPopupCard.close();
    })
    .finally(() => showPopupCard.setLoading());
}

const showPopupCard = new PopupWithForm('.popup_type_add-card', handleFormAddCardSubmit);

// Слушатель события клик по кнопке "Добавить" карточку
profileAddButton.addEventListener('click', handleProfileAddButtonClick);

function handleProfileAddButtonClick() {
  // Очищаем поля ввода от ошибок
  formAddValidation.clearInputsErrors();
  showPopupCard.open();  
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '0bc141f1-6053-416b-8022-646082ea4528',
    'Content-Type': 'application/json'
  }
});

// Получаем с сервера информацию о пользователе (имя, род деятельности, аватар, alt) 
// и добавляем ее в DOM
api.getUserInfoServer()
  .then(userInfoServer => {
    profileUserInfo.setUserInfo(userInfoServer);
    updateAvatar(userInfoServer.avatar);
    profileAvatar.alt = userInfoServer.name;
    userId = userInfoServer._id;

    // Выдергиваем из промиса массив с карточками и публикуем методом 
    // renderItems класса Section
    api.getInitialCards()
      .then(initialCards => cardsList.renderItems(initialCards))
  })
  .catch(err => console.log(err));

function updateAvatar(link) {
  profileAvatar.src = link;
}