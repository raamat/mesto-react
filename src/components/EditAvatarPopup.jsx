import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const inputRef = useRef();

   function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value
    });
  }
  return (
    <PopupWithForm 
    name="edit-avatar"
    title="Обновить аватар"
    isOpen={isOpen} 
    onClose={onClose}
    onSubmit={handleSubmit}
  > 
    <input 
      id="input-link-avatar" 
      className="popup__input popup__input_type_link-avatar" 
      type="url" 
      placeholder="Ссылка на аватар" 
      name="link" 
      required
      ref={inputRef}
    />
    <span className="input-link-avatar-error popup__input-error">
      Вставьте ссылку на аватар
    </span>         
  </PopupWithForm> 
  )
}

export default EditAvatarPopup;