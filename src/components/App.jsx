import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditAvatarPopup from './EditAvatarPopup'
import EditProfilePopup from './EditProfilePopup';
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
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen); 
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
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

  function handleUpdateUser(infoUser) {
    api.setUserInfoServer(infoUser)
      .then((data) => setCurrentUser(data))
      .catch(err => console.log(err))
      .finally(() => closeAllPopups())
  }

  function handleUpdateAvatar(userAvatar) {
    debugger
    api.updateAvatarServer(userAvatar.avatar)
      .then((data) => setCurrentUser(data))
      .catch(err => console.log(err))
      .finally(() => closeAllPopups())
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
      <EditAvatarPopup 
        isOpen={isEditAvatarPopupOpen} 
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen} 
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <PopupWithForm 
        name="add-card" 
        title="Новое место" 
        buttonText="Создать" 
        isOpen={isAddPlacePopupOpen} 
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
