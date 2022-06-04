import React, { useState, useRef } from 'react';

import PopupWithForm from './PopupWithForm';


/**
 * Функция генерирует компонент с основным содержанием попапа добавления нового места
 * @param props - Данные, включая обработчики кликов isOpen, onClose, onAddCard
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function AddPlacePopup({ isOpen, onClose, onAddCard, isLoading }) {

  const [placeInfo, setPlaceInfo] = useState({namePlace: '', urlPlaceImg: ''});

  const refBtnSubmit = useRef();

  const [inputErrors, setInputErrors] = useState ({
      namePlace: false,
      urlPlaceImg: false
  });


  /**
   * Функция отправляет данные с инпута в функцию изменения стейта информации о месте
   * @param evt
   */
  const handleChangeInputText = (evt) => {
    setPlaceInfo({...placeInfo, [evt.target.name] : evt.target.value});
  }


  /**
   * Функция отправляет данные с инпута в функцию изменения стейта о наличии или отсутсвии ошибки
   * @param inputName
   * @param isError
   */
  const changeInputErrorState = (inputName, isError) => {
    setInputErrors((state) => ({...state, [inputName] : isError}));
  }


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
  }


  /**
   * Функция сбрасывает текст с инпутов формы
   */
  const resetInputs = () => {
    setPlaceInfo({namePlace: '', urlPlaceImg: ''});
  }


  /**
   * Функция обрабатывает нажатие кнопки сабмита формы
   * @param evt
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onAddCard(placeInfo);

    setPlaceInfo({namePlace: '', urlPlaceImg: ''});
  };


 return (
   <PopupWithForm
      name={'add-place'}
      title={'Новое место'}
      btnText={'Создать'}
      ariaLabel={'Закрыть форму добавления места'}
      inputs={[
        {
          inputType: 'text',
          inputId: 'input-place-name',
          inputName: 'namePlace',
          placeholder: 'Название',
          minLength: 2,
          maxLength: 30
        },
        {
          inputType: 'url',
          inputId: 'input-place-url-__img',
          inputName: 'urlPlaceImg',
          placeholder: 'Ссылка на картинку',
          },
        ]}
     isOpen={isOpen}
     onClose={onClose}
     inputData={placeInfo}
     refBtnSubmit={refBtnSubmit}
     onHandleChangeInputText={handleChangeInputText}
     onHandleChangeInputError={handleChangeInputError}
     onSubmit={handleSubmit}
     isLoading={isLoading}
     resetInputs={resetInputs}
   />
 )
}

export default AddPlacePopup;