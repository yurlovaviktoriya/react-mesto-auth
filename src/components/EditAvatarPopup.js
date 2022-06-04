import React, { useState, useRef } from 'react';

import PopupWithForm from './PopupWithForm';


/**
 * Функция генерирует компонент с основным содержанием попапа редактирования профиля
 * @param props - Данные, включая обработчики кликов isOpen, onClose, onUpdateUser
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  const [avatar, setAvatar] = useState('');

  const refBtnSubmit = useRef();


  /**
   * Функция отправляет данные с инпута в функцию изменения стейта информации о пользователе
   * @param evt
   */
  const handleChangeInputText = (evt) => {
    setAvatar(evt.target.value);
  }


  /**
   * Функция проверяет есть ли ошибка в инпуте и возвращает информацию назад для активации/деактивации кнопки сабмита
   * @param evt
   * @param isInvalidInput
   * @returns {this is boolean[]}
   */
  const handleChangeInputError = (evt, isInvalidInput) => {
     if (isInvalidInput) {
       return false;
     } else {
       return true;
     }
  };


  /**
   * Функция сбрасывает текст с инпутов формы
  */
  const resetInputs = () => {
    setAvatar('');
  }


  /**
   * Функция обрабатывает нажатие кнопки сабмита формы
   * @param evt
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateAvatar(avatar);

    setAvatar('');
  }

  return (
    <PopupWithForm
      name={'update-avatar'}
      title={'Обновить аватар'}
      btnText={'Сохранить'}
      ariaLabel={'Закрыть форму обновления аватара'}
      inputs={[
        {
          inputType: 'url',
          inputId: 'input-avatar-url',
          inputName: 'urlAvatar',
          placeholder: 'Ссылка на аватар',
        }
      ]}
      isOpen={isOpen}
      onClose={onClose}
      onHandleChangeInputText={handleChangeInputText}
      onHandleChangeInputError={handleChangeInputError}
      inputData={{urlAvatar: avatar}}
      onSubmit={handleSubmit}
      refBtnSubmit={refBtnSubmit}
      isLoading={isLoading}
      resetInputs={resetInputs}
    />
  )
}

export default EditAvatarPopup;