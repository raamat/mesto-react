import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [isCardsLoading, setIsCardsLoading] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    setIsCardsLoading(true);
    api.getInitialCards()
      .then((cardsList) => {
        setCards(
          cardsList.map((item) => ({
            name: item.name,
            link: item.link,
            likes: item.likes,
            _id: item._id,
            owner: item.owner
          }))
        );
      })
      .catch(err => console.log(err))
      .finally(() => setIsCardsLoading(false));
    }, []);

  useEffect(() => {
    setIsProfileLoading(true);
    api.getUserInfoServer()
      .then((userInfo) => {setCurrentUser(userInfo)})
      .catch(err => console.log(err))
      .finally(() => setIsProfileLoading(false)); 
  }, [])

  function handleEditAvatarClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditProfileClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }
  
  function handleCardClick(card) {
    console.log('Клик', card);
  }
  
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.setLikeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCardServer(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err))
  }

  return (
    // Данные из стейт-переменной currentUser доступны всем компонентам
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <Main
          isProfileLoading={isProfileLoading}
          isCardsLoading={isCardsLoading}
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
      </div>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm 
        name="edit-avatar"
        title="Обновить аватар"
        isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
      > 
        <input 
          id="input-link-avatar" 
          className="popup__input popup__input_type_link-avatar" 
          type="url" 
          placeholder="Ссылка на аватар" 
          name="link" 
          required
        />
        <span className="input-link-avatar-error popup__input-error">
          Вставьте ссылку на аватар
        </span>         
      </PopupWithForm>
      <PopupWithForm 
        name="edit-profile" 
        title="Редактировать профиль"
        isOpen={isAddPlacePopupOpen} 
        onClose={closeAllPopups}
      > 
        <input 
          id="name-input" 
          className="popup__input popup__input_type_name" 
          type="text" 
          placeholder="Имя" 
          name="name" minLength="2" 
          maxLength="40" 
          required 
          defaultValue="Имя"
        />
        <span className="name-input-error popup__input-error"></span>
        <input 
          id="job-input" 
          className="popup__input popup__input_type_job" 
          type="text" 
          placeholder="Род деятельности" 
          name="job" 
          minLength="2" 
          maxLength="200" 
          required 
          defaultValue="Род деятельности"
        />
        <span className="job-input-error popup__input-error"></span>       
      </PopupWithForm>
      <PopupWithForm 
        name="add-card" 
        title="Новое место" 
        buttonText="Создать" 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
      > 
        <input 
          id="place-input" 
          className="popup__input popup__input_type_place" 
          type="text" 
          placeholder="Название" 
          name="place" 
          minLength="2" 
          maxLength="30" 
          required
        />
        <span className="place-input-error popup__input-error">Вы пропустили это поле</span>
        <input 
          id="link-input" 
          className="popup__input popup__input_type_link" 
          type="url" 
          placeholder="Ссылка на картинку" 
          name="link" 
          required
        />
        <span className="link-input-error popup__input-error">Вы пропустили это поле</span>
      </PopupWithForm>
      <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да" isOpen={false}/>  
    </CurrentUserContext.Provider>
  );
}

export default App;
