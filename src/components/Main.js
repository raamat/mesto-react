import spinner from '../images/spinner.gif';

function Main() {
  function handleEditAvatarClick() {
    document.querySelector(".popup_type_edit-avatar").classList.add("popup_opened");
  }
  function handleEditProfileClick() {
    document.querySelector(".popup_type_edit-profile").classList.add("popup_opened");
  }
  function handleAddPlaceClick() {
    document.querySelector(".popup_type_add-card").classList.add("popup_opened");
  }

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button" type="button" aria-label="Редактировать аватар" onClick={handleEditAvatarClick}>
          <img className="profile__avatar" src={spinner} alt="Аватар"/>
        </button>
        <div className="profile__info">
          <div className="profile__title-block">
            <h1 className="profile__title">Жак-Ив Кусто</h1>
            <button className="profile__edit-button opacity" type="button" aria-label="Редактировать профиль" onClick={handleEditProfileClick}></button>
          </div>    
          <p className="profile__subtitle">Исследователь океана</p>
        </div>
        <button className="profile__add-button opacity" type="button" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="cards">
        <ul className="cards__list"> 
        </ul>
      </section>
    </main>
  )
}

export default Main;