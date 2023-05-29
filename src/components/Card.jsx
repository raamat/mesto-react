import React from 'react';

function Card({ card, onCardClick }) {
  return (
    <li className="card" key={card.id}>
      <img
        className="card__photo"
        src={card.link}
        alt={card.name}
        onClick={() => onCardClick(card)}
      />
      <div className="card__caption">
        <h2 className="card__title">{card.name}</h2>
        <button className="card__delete-button opacity" type="button"></button>
        <div className="card__like-container">
          <button className="card__like-button" type="button"></button>
          <p className="card__like-count">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;