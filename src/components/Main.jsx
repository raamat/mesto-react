import React, { useState, useEffect } from 'react';
import Card from './Card';
import Spiner from './Spinner';
import spinner from '../images/spinner.gif';
import { api } from '../utils/api.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');

  const [cards, setCards] = useState([]);
  const [isCardsLoading, setIsCardsLoading] = useState(false);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  
  useEffect(() => {
    setIsCardsLoading(true);
    setIsProfileLoading(true);

    api.getUserInfoServer()
      .then((userInfoServer) => {
        setUserName(userInfoServer.name);
        setUserDescription(userInfoServer.about);
        setUserAvatar(userInfoServer.avatar);
      })
      .catch(err => console.log(err))
      .finally(() => setIsProfileLoading(false));

    api.getInitialCards()
      .then((cardsList) => {
        setCards(
          cardsList.map((item) => ({
            name: item.name,
            link: item.link,
            likes: item.likes,
            id: item._id,
          }))
        );
      })
      .catch(err => console.log(err))
      .finally(() => setIsCardsLoading(false));
    }, []);

  return (
    <main className="content">
      <section className="profile">
        <button 
          className="profile__avatar-button" 
          type="button" 
          aria-label="Редактировать аватар" 
          onClick={onEditAvatar} 
          style={{ backgroundImage: `url(${userAvatar})` }}
        >
          {
            isProfileLoading 
            ? (<img className="profile__avatar" src={spinner} alt="Аватар"/>)
            : (<img className="profile__avatar" src={userAvatar} alt="Аватар"/>)
          }
        </button>
        <div className="profile__info">
          <div className="profile__title-block">
            <h1 className="profile__title">{userName}</h1>
            <button 
              className="profile__edit-button opacity" 
              type="button" 
              aria-label="Редактировать профиль" 
              onClick={onEditProfile}
            ></button>
          </div>    
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button className="profile__add-button opacity" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {isCardsLoading
            ? (<Spiner />)
            : (cards.map((card) => <Card key={card.id} card={card} onCardClick={onCardClick} />))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;