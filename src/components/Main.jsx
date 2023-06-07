import React, { useState, useEffect, useContext } from 'react';
import Card from './Card';
import Spiner from './Spinner';
import spinner from '../images/spinner.gif';
import { api } from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, isProfileLoading }) {
  const [cards, setCards] = useState([]);
  const [isCardsLoading, setIsCardsLoading] = useState(false);

  // Подписка на контекст
  const user = useContext(CurrentUserContext);
  
  useEffect(() => {
    setIsCardsLoading(true);
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
          style={{ backgroundImage: `url(${user.avatar})` }}
        >
          {isProfileLoading
            ? (<img className="profile__avatar" src={spinner} alt="Аватар"/>)
            : (<img className="profile__avatar" src={user.avatar} alt="Аватар"/>)
          }
        </button>
        <div className="profile__info">
          <div className="profile__title-block">
            <h1 className="profile__title">{user.name}</h1>
            <button 
              className="profile__edit-button opacity" 
              type="button" 
              aria-label="Редактировать профиль" 
              onClick={onEditProfile}
            ></button>
          </div>    
          <p className="profile__subtitle">{user.about}</p>
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