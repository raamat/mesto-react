import React from 'react';

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card && 'popup_opened'}`}>
      <figure className="popup__photo-container">
        <button className="popup__close-button opacity" type="button" onClick={onClose}></button>
        <img className="popup__photo" src={card?.link ?? ""} alt={card?.name ?? ""}/>
        <figcaption className="popup__photo-caption">{card?.name ?? ""}</figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;