import { useContext } from 'react';
import Card from './Card';
import Spiner from './Spinner/Spinner';
import spinner from '../images/spinner.gif';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ 
  onEditAvatar, 
  onEditProfile, 
  onAddPlace,
  isProfileLoading,
  isCardsLoading,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
  }) 
{

  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  
  return (
    <main className="content">
      <section className="profile">
        <button 
          className="profile__avatar-button" 
          type="button" 
          aria-label="Редактировать аватар" 
          onClick={onEditAvatar} 
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
        >
          {isProfileLoading
            ? (<img className="profile__avatar" src={spinner} alt="Аватар"/>)
            : (<img className="profile__avatar" src={currentUser.avatar} alt="Аватар"/>)
          }
        </button>
        <div className="profile__info">
          <div className="profile__title-block">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button 
              className="profile__edit-button opacity" 
              type="button" 
              aria-label="Редактировать профиль" 
              onClick={onEditProfile}
            ></button>
          </div>    
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button className="profile__add-button opacity" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list">
          {isCardsLoading
            ? (<Spiner />)
            : (cards.map((card) => 
              <Card 
                key={card._id} 
                card={card} 
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}  
              />))
          }
        </ul>
      </section>
    </main>
  )
}

export default Main;