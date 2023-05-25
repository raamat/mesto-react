function ImagePopup() {
  return (
    <div className="popup popup_type_zoom-photo">
      <figure className="popup__photo-container">
        <button className="popup__close-button opacity" type="button"></button>
        <img className="popup__photo" src="#" alt=""/>
        <figcaption className="popup__photo-caption"></figcaption>
      </figure>
    </div>
  )
}

export default ImagePopup;