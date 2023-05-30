import React from 'react';
function PopupWithForm({ 
  name, 
  title, 
  children,
  buttonText,
  isOpen,
  onClose
})

{
  return (
    <div className={
      isOpen
        ? `popup popup_opened`
        : `popup`
      }
    >
    <div className="popup__container">
      <button className="popup__close-button opacity" type="button" onClick={onClose}></button>
      <h2 className="popup__title">{title}</h2>
        <form className={`popup__form popup__form_type_${name}`} name={`popup-form-${name}`} noValidate autoComplete="off">
          {children}
          <button className="popup__submit-button" type="submit">{buttonText || 'Сохранить'}</button>
        </form>
    </div>
  </div>
  )
}

export default PopupWithForm;