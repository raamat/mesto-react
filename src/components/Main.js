import React, {useState, useEffect} from 'react';
import spinner from '../images/spinner.gif';
import {api} from '../utils/api.js';



function Main({ onEditAvatar, onEditProfile, onAddPlace }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  
  useEffect(() => {
    api.getUserInfoServer()
      .then(userInfoServer => {
        setUserName(userInfoServer.name);
        setUserDescription(userInfoServer.about);
        setUserAvatar(userInfoServer.avatar);
      })
  })

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button" type="button" aria-label="Редактировать аватар" onClick={onEditAvatar} style={{ backgroundImage: `url(${userAvatar})` }}>
          <img className="profile__avatar" src={spinner} alt="Аватар"/>
        </button>
        <div className="profile__info">
          <div className="profile__title-block">
            <h1 className="profile__title">{userName}</h1>
            <button className="profile__edit-button opacity" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          </div>    
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button className="profile__add-button opacity" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list"> 
        </ul>
      </section>
    </main>
  )
}

export default Main;