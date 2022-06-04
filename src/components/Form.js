import React, { useState, useEffect } from 'react';
import Input from './Input';


function Form({ name, title, inputs, onSubmit, isLoading, btnText, inputData,
                onHandleChangeInputError, onHandleChangeInputText, refBtnSubmit, isLightTheme, onClose}) {

  const btnSubmitText = isLoading ? 'Сохранение...' : btnText;
  const [btnState, setBtnState] = useState(true);

  const formTitleClassName = `form__title ${isLightTheme ? 'form__title_type_light-theme' : 'form__title_type_dark-theme'}`;
  const btnSubmitClassName = `form__btn ${isLightTheme ? 'form__btn_type_light-theme' : 'form__btn_type_dark-theme'}
                                ${btnState ? '' : 'form__btn_disabled'}`


   useEffect(() => {
     setBtnState(true);
   }, [onClose])

  /**
   * Функция активации/деактивации кнопки сабмита в зависимости от наличия ошибок в инпутах формы
   * @param evt
   * @param hasInvalidInput
   */
  const toggleButtonState = (evt, hasInvalidInput) => {
    const isError = !onHandleChangeInputError(evt, hasInvalidInput);
    if (isError) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  };

  return (
    <form className="form" name={`form-${name}`} onSubmit={onSubmit}>
      <h2 className={formTitleClassName}>{title}</h2>
      {inputs.map((input) => (
        <Input
          key={input.inputId}
          settings={input}
          inputText={inputData[input.inputName]}
          onHandleChangeInputText={onHandleChangeInputText}
          onToggleButtonState={toggleButtonState}
          isLightTheme={isLightTheme}
          onClose={onClose}
        />
      ))}
      <button ref={refBtnSubmit} className={btnSubmitClassName} type="submit">{btnSubmitText}</button>
    </form>
  )
}

export default Form;
