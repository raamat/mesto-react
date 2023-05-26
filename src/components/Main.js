import spinner from '../images/spinner.gif';

function Main({ onEditAvatar, onEditProfile, onAddPlace }) {


  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-button" type="button" aria-label="Редактировать аватар" onClick={onEditAvatar}>
          <img className="profile__avatar" src={spinner} alt="Аватар"/>
        </button>
        <div className="profile__info">
          <div className="profile__title-block">
            <h1 className="profile__title">Жак-Ив Кусто</h1>
            <button className="profile__edit-button opacity" type="button" aria-label="Редактировать профиль" onClick={onEditProfile}></button>
          </div>    
          <p className="profile__subtitle">Исследователь океана</p>
        </div>
        <button className="profile__add-button opacity" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="cards">
        <ul className="cards__list"> 
        </ul>
      </section>
    </main>
  )
}

export default Main;