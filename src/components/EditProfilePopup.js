import React, { useState, useRef, useContext, useEffect } from 'react';

import PopupWithForm from './PopupWithForm';

import { CurrentUserContext } from "../contexts/CurrentUserContext";


/**
 * Функция генерирует компонент с основным содержанием попапа редактирования профиля
 * @param props - Данные, включая обработчики кликов isOpen, onClose, onUpdateUser
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  const { name, about } = useContext(CurrentUserContext).currentUser;

  const [profileInfo, setProfileInfo] = useState({
      profileName: '',
      profileDescription: ''
  });


  const [inputErrors, setInputErrors] = useState({
    profileName: false,
    profileDescription: false
  });

  const refBtnSubmit = useRef();

  useEffect(() => {
    setProfileInfo({
      profileName: name,
      profileDescription: about
    });
  }, [name, about, onClose]);


  /**
   * Функция отправляет данные с инпута в функцию изменения стейта информации о пользователе
   * @param evt
   */
  const handleChangeInputText = (evt) => {
    setProfileInfo(state => ({...state, [evt.target.name] : evt.target.value}));
  };



  /**
   * Функция отправляет данные с инпута в функцию изменения стейта о наличии или отсутсвии ошибки
   * @param inputName
   * @param isError
   */
  const changeInputErrorState = (inputName, isError) => {
    setInputErrors((state) => ({...state, [inputName] : isError}));
  };


  /**
   * Функция проверяет есть ли ошибка в инпуте и отправляет данные в функцию обновления стейта
   * @param evt
   * @param isInvalidInput
   * @returns {this is boolean[]}
   */
  const handleChangeInputError = (evt, isInvalidInput) => {
     if (isInvalidInput) {
       changeInputErrorState(evt.target.name, true);
     } else {
       changeInputErrorState(evt.target.name, false);
     }
    return Object.values(inputErrors).every(item => item === false);
  };


  /**
   * Функция сбрасывает текст с инпутов формы
  */
  const resetInputs = () => {
    setProfileInfo((state) => ({...state,
      profileName: '',
      profileDescription: ''
    }));
  }


  /**
   * Функция обрабатывает нажатие кнопки сабмита формы
   * @param evt
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onUpdateUser(
      {
        name: profileInfo.profileName,
        about: profileInfo.profileDescription
      },
    );

    setProfileInfo({profileName: '', profileDescription: ''})
  };

  return (
    <PopupWithForm
      name={'edit-profile'}
      title={'Редактировать профиль'}
      btnText={'Сохранить'}
      ariaLabel={'Закрыть форму редактирования профиля'}
      inputs={[
        {
          inputType: 'text',
          inputId: 'input-profile-name',
          inputName: 'profileName',
          placeholder: 'Введите имя',
          minLength: 2,
          maxLength: 40
        },
        {
          inputType: 'text',
          inputId: 'input-profile-description',
          inputName: 'profileDescription',
          placeholder: 'Область интересов',
          minLength: 2,
          maxLength: 200
        },
      ]}
      isOpen={isOpen}
      onClose={onClose}
      onHandleChangeInputText={handleChangeInputText}
      onHandleChangeInputError={handleChangeInputError}
      inputData={profileInfo}
      onSubmit={handleSubmit}
      refBtnSubmit={refBtnSubmit}
      isLoading={isLoading}
      resetInputs={resetInputs}
    />
  )
}

export default EditProfilePopup;