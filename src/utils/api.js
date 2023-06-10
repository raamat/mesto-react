class Api {
  constructor(options) {
    this._options = options;
  }
  
  // Универсальный метод для формирования запроса
  _insertFetch(endUrl, method, data) {
    // Разбиваем объект на свойства
    const {baseUrl, headers} = this._options;
    return fetch(`${baseUrl}/${endUrl}`, {
      headers, 
      method, 
      body: data ? JSON.stringify(data) : undefined
    });
  }

  // Если все ОК, метод вернет промис. При ошибке вернется статус ошибки
  _checkErr(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  // Получаем ссылку на аватар
  getAvatarServer() {
    return this._insertFetch('users/me').then(this._checkErr);
  }
  
  // Загрузка информации о пользователе с сервера
  getUserInfoServer() {
    return this._insertFetch('users/me').then(this._checkErr);
  }

  // Загрузка карточек с сервера
  getInitialCards() {
    return this._insertFetch('cards').then(this._checkErr);
  }

   
  // Редактирование профиля
  // Отредактированные данные профиля должны сохраняться на сервере
  setUserInfoServer(inputValues) {
    return this._insertFetch('users/me', 'PATCH', 
      {
        name: inputValues.name,
        about: inputValues.about
      }
    ) 
    .then(this._checkErr)
  }

  // Добавление новой карточки
  setCardServer(cardData) {
    return this._insertFetch('cards','POST', 
      {
        name: cardData.name,
        link: cardData.link
      }
    )
    .then(this._checkErr)  
  } 

  // Удаление карточки
  deleteCardServer(cardId) {
    return this._insertFetch(`cards/${cardId}`, 'DELETE')
    .then(this._checkErr)  
  }

  // Обновление аватара пользователя
  updateAvatarServer(link) {
    return this._insertFetch('users/me/avatar','PATCH',
      {
        avatar: link
      })
    .then(this._checkErr)  
  }

  // Установка/удаление лайка
  setLikeCard(cardId, is) {
    return this._insertFetch(`cards/likes/${cardId}`, is ? 'PUT' : 'DELETE')
    .then(this._checkErr) 
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '0bc141f1-6053-416b-8022-646082ea4528',
    'Content-Type': 'application/json'
  }
});