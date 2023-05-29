import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_zoom-photo ${card && 'popup_opened'}`}>
      <figure className="popup__photo-container">
        <button className="popup__close-button opacity" type="button" onClick={onClose}></button>
        <img className="popup__photo" src={card ? card.link : ''} alt={card ? card.name : ''}/>
        <figcaption className="popup__photo-caption">{card ? card.name : ''}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;