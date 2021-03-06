import React, { useState } from 'react';

import Form from './Form';


/**
 * Функция генерирует компонент модальное окно
 * @param props - Данные для генерации формы модального окна
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function PopupWithForm({
                         name, title, btnText, ariaLabel, isOpen, onClose, inputs, onHandleChangeInputText,
                         onHandleChangeInputError, inputData, onSubmit, refBtnSubmit, isLoading,
                         resetInputs}) {


  /**
   * Функция вызывыет закрытие попапа формы и очистку инпутов формы
   */
  const handleOnClick = ()  => {
    onClose();

    resetInputs();
  }

  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__form-container">
        <Form
          name={name}
          title={title}
          inputs={inputs}
          onHandleChangeInputText={onHandleChangeInputText}
          onHandleChangeInputError={onHandleChangeInputError}
          inputData={inputData}
          onSubmit={onSubmit}
          refBtnSubmit={refBtnSubmit}
          isLoading={isLoading}
          btnText={btnText}
          isLightTheme={true}
          onClose={onClose}
        />
        <button className="popup__btn-close" type="button" aria-label={ariaLabel}
          onClick={handleOnClick}></button>
      </div>
    </div>
  )
}


export default PopupWithForm;
