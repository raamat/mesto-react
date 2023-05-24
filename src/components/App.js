import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {
  return (
    <>
      <div className="page__container">
        <Header />
        <Main />
        <Footer />
      </div>
      <div className="popup popup_type_edit-avatar">
        <div className="popup__container">
          <button className="popup__close-button opacity" type="button"></button>
          <h2 className="popup__title">Обновить аватар</h2>
            <form className="popup__form popup__form_type_avatar-profile" name="popup-form-edit-avatar-profile" noValidate autoComplete="off">
              <input id="input-link-avatar" className="popup__input popup__input_type_link-avatar" type="url" placeholder="Ссылка на аватар" name="link" required/>
              <span className="input-link-avatar-error popup__input-error">Вставьте ссылку на аватар</span>
              <button className="popup__submit-button" type="submit">Сохранить</button>
            </form>
        </div>
      </div>
      <div className="popup popup_type_edit-profile">
        <div className="popup__container">
          <button className="popup__close-button opacity" type="button"></button>
          <h2 className="popup__title">Редактировать профиль</h2>
            <form className="popup__form popup__form_type_edit-profile" name="popup-form-edit-profile" noValidate autoComplete="off">
              <input id="name-input" className="popup__input popup__input_type_name" type="text" placeholder="Имя" name="name" minLength="2" maxLength="40" required defaultValue="Имя"/>
              <span className="name-input-error popup__input-error"></span>
              <input id="job-input" className="popup__input popup__input_type_job" type="text" placeholder="Род деятельности" name="job" minLength="2" maxLength="200" required defaultValue="Род деятельности"/>
              <span className="job-input-error popup__input-error"></span>
              <button className="popup__submit-button" type="submit">Сохранить</button>
            </form>
        </div>
      </div>
      <div className="popup popup_type_add-card">
        <div className="popup__container">
          <button className="popup__close-button opacity" type="button"></button>
          <h2 className="popup__title">Новое место</h2>
            <form className="popup__form popup__form_type_add-card" name="popup-form-add-card" noValidate autoComplete="off">
              <input id="place-input" className="popup__input popup__input_type_place" type="text" placeholder="Название" name="place" minLength="2" maxLength="30" required/>
              <span className="place-input-error popup__input-error">Вы пропустили это поле</span>
              <input id="link-input" className="popup__input popup__input_type_link" type="url" placeholder="Ссылка на картинку" name="link" required/>
              <span className="link-input-error popup__input-error">Вы пропустили это поле</span>
              <button className="popup__submit-button popup__submit-button_type_create-card" type="submit">Создать</button>
            </form>
          </div>  
      </div>
      <div className="popup popup_type_zoom-photo">
        <figure className="popup__photo-container">
          <button className="popup__close-button opacity" type="button"></button>
          <img className="popup__photo" src="#" alt=""/>
          <figcaption className="popup__photo-caption"></figcaption>
        </figure>
      </div>
      <div className="popup popup_type_delete-card">
        <div className="popup__container">
          <button className="popup__close-button opacity" type="button"></button>
          <h2 className="popup__title">Вы уверены?</h2>
            <form className="popup__form popup__form_type_delete-card" name="popup-form-delete-card" noValidate autoComplete="off">
              <button className="popup__submit-button" type="submit">Да</button>
            </form>
        </div>
      </div>
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
