import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const inputNameRef = useRef();
  const inputLinkRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();

    onAddPlace({
      name: inputNameRef.current.value,
      link: inputLinkRef.current.value,
    });

    inputNameRef.current.value = "";
    inputLinkRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        id="place-input"
        className="popup__input popup__input_type_place"
        type="text"
        placeholder="Название"
        name="place"
        minLength="2"
        maxLength="30"
        required
        ref={inputNameRef}
      />
      <span className="place-input-error popup__input-error">
        Вы пропустили это поле
      </span>
      <input
        id="link-input"
        className="popup__input popup__input_type_link"
        type="url"
        placeholder="Ссылка на картинку"
        name="link"
        required
        ref={inputLinkRef}
      />
      <span className="link-input-error popup__input-error">
        Вы пропустили это поле
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
