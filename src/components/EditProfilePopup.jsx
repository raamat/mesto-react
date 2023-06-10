import { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);
  //console.log(currentUser.name)

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser])

  // Обработчик изменения инпута обновляет стейт
  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm 
        name="edit-profile" 
        title="Редактировать профиль"
        isOpen={isOpen} 
        onClose={onClose}
        onSubmit={handleSubmit}
      > 
        <input 
          id="name-input" 
          className="popup__input popup__input_type_name" 
          type="text" 
          placeholder="Имя" 
          name="name" minLength="2" 
          maxLength="40" 
          required 
          value={name}
          onChange={handleChangeName}
        />
        <span className="name-input-error popup__input-error"></span>
        <input 
          id="job-input" 
          className="popup__input popup__input_type_job" 
          type="text" 
          placeholder="Род деятельности" 
          name="job" 
          minLength="2" 
          maxLength="200" 
          required 
          value={description}
          onChange={handleChangeDescription}
        />
        <span className="job-input-error popup__input-error"></span>       
      </PopupWithForm>
  )
}

export default EditProfilePopup;