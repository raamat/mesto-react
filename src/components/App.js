import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  return (
    <>
      <div className="page__container">
        <Header />
        <Main />
        <Footer />
      </div>
      
        <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить"> 
          <input id="input-link-avatar" className="popup__input popup__input_type_link-avatar" type="url" placeholder="Ссылка на аватар" name="link" required/>
          <span className="input-link-avatar-error popup__input-error">Вставьте ссылку на аватар</span>         
        </PopupWithForm>
        <PopupWithForm name="edit-profile" title="Редактировать профиль" buttonText="Сохранить"> 
          <input id="name-input" className="popup__input popup__input_type_name" type="text" placeholder="Имя" name="name" minLength="2" maxLength="40" required defaultValue="Имя"/>
          <span className="name-input-error popup__input-error"></span>
          <input id="job-input" className="popup__input popup__input_type_job" type="text" placeholder="Род деятельности" name="job" minLength="2" maxLength="200" required defaultValue="Род деятельности"/>
          <span className="job-input-error popup__input-error"></span>       
        </PopupWithForm>
        <PopupWithForm name="add-card" title="Новое место" buttonText="Создать"> 
          <input id="place-input" className="popup__input popup__input_type_place" type="text" placeholder="Название" name="place" minLength="2" maxLength="30" required/>
          <span className="place-input-error popup__input-error">Вы пропустили это поле</span>
          <input id="link-input" className="popup__input popup__input_type_link" type="url" placeholder="Ссылка на картинку" name="link" required/>
          <span className="link-input-error popup__input-error">Вы пропустили это поле</span>
        </PopupWithForm>
        <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да"/> 
        <ImagePopup />
      
      <template id="card-template">
        <li className="card">
          <img className="card__photo" src="#" alt=""/>
          <div className="card__caption">
            <h2 className="card__title"></h2>
            <button className="card__delete-button opacity" type="button"></button>
            <div className="card__like-container">
              <button className="card__like-button" type="button"></button>
              <p className="card__like-count">0</p>
            </div>
          </div>
        </li>
      </template>
    </>
  );
}

export default App;
