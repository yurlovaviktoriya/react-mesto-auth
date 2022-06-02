import React, { useState, useRef } from 'react';

import InputValidator from "../utils/inputValidator";


/**
 * Функция генерирует компонент инпута
 * @param props - Данные для заполнения инпута
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function Input({ settings, inputText, onHandleChangeInputText, onToggleButtonState, isLightTheme }) {

  const [isError, setIsError] = useState({isValid: true, message: ''})
  const refInput = useRef();


  const inputClassName = `form__input ${isLightTheme ? 'form__input_type_light-theme' : 'form__input_type_dark-theme'}
                          ${isError.isValid ? '' : 'form__input_type_error'}`

  const textError = isError.isValid ? '' : isError.message;


  /**
   * Функция обрабатывает ввод в инпут и запускает валидацию данных ввода
   * @param evt
   */
  const handleChange = (evt) => {

    onHandleChangeInputText(evt);

    const inputValidator = new InputValidator(refInput.current);

    const validationResult = inputValidator.enableValidation();
    if (!validationResult.isValid) {
      setIsError({isValid: false, message: validationResult.errorMessage});
      onToggleButtonState(evt, true);
    } else {
      setIsError({isValid: true, message: ''});
      onToggleButtonState(evt, false);
    }
  }

  return (
    <div className="form__input-wrapper">
       <input className={inputClassName}
         type={settings.inputType} id={settings.inputId} name={settings.inputName} required
         placeholder={settings.placeholder} minLength={settings.minLength && settings.minLength}
         maxLength={settings.maxLength && settings.maxLength} onChange={handleChange}
         value={inputText} ref={refInput} />
       <span className={`form__input-error ${settings.inputId}-error`}>{textError}</span>
    </div>
  )
}


export default Input;
