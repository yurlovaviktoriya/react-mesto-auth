/**
 * Функция генерирует компонент модальное окно
 * @param props - Данные для заполнения модального окна
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function ImagePopup({ name, card, onClose }) {

  return (
    <div className={`popup popup_type_${name} ${card && 'popup_opened'}`}>
      <div className="popup__place-container">
        <img className="popup__place-img" src={card?.link} alt={`Изображение места ${card?.name}`} />
        <h3 className="popup__place-title">{card?.name}</h3>
        <button className="popup__btn-close" type="button" aria-label="Закрыть изображение места"
          onClick={onClose}></button>
      </div>
    </div>
  )
}


export default ImagePopup;
