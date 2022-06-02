import React from 'react';

import success from '../images/register_success.svg';
import fail from '../images/register_fail.svg';


/**
 * Функция генерирует компонент модальное окно
 * @param props - Данные для заполнения модального окна
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function InfoToolTip({ isSuccess, isOpen, onClose }) {

  const message = isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';
  const iconMessage = isSuccess ? success : fail;
  const popupClassName = `popup ${isOpen ? 'popup_opened' : ''}`;

  return (
    <div className={popupClassName}>
      <div className='popup__message-container'>
        <img className="popup__img" src={iconMessage} alt="Иконка подтверждения регистрации"/>
        <h2 className='popup__title'>{message}</h2>
        <button className="popup__btn-close" type="button" aria-label="Закрыть модальное окно"
          onClick={onClose}></button>
      </div>
    </div>
  )
}

export default InfoToolTip;