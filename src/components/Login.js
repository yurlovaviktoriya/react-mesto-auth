import React, { useState, useRef } from 'react';

import Header from './Header';
import Form from "./Form";


/**
 * Функция генерирует компонент с формой для аутентификации пользователя
 * @param props - Данные для заполнения компонента
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function Login({ onLogin, isLoading }) {

  const btnText = isLoading ? 'Вход...' : 'Войти';

  const [userLoginInfo, setUserLoginInfo]  = useState({
    emailLogin: '',
    passwordLogin: ''
  })


  const [inputErrors, setInputErrors] = useState({
    emailLogin: false,
    passwordLogin: false
  });

  const refBtnSubmit = useRef();

    /**
   * Функция отправляет данные с инпута в функцию изменения стейта информации о регистрации пользователя
   * @param evt
   */
  const handleChangeInputText = (evt) => {
    setUserLoginInfo(state => ({...state, [evt.target.name] : evt.target.value}));
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
   * Функция обрабатывает сабмит формы
   * @param evt
   */
  const handleSubmit = (evt) => {
    evt.preventDefault();

    onLogin({
      email: userLoginInfo.emailLogin,
      password: userLoginInfo.passwordLogin
    });
  }


  return (
    <>
    <Header
      isMain={false}
      btnText={'Регистрация'}
      link={'/sign-up'}
    />
    <div className="auth">
      <div className="auth__form-container">
        <Form
          name={'login'}
          title={'Вход'}
          btnText={btnText}
          inputs={[
            {
              inputType: 'email',
              inputId: 'input-login-email',
              inputName: 'emailLogin',
              placeholder: 'Email'
            },
              {
              inputType: 'password',
              inputId: 'input-login-password',
              inputName: 'passwordLogin',
              placeholder: 'Пароль'
            }
          ]}
          onSubmit={handleSubmit}
          inputData={{
            emailLogin: userLoginInfo.emailLogin,
            passwordLogin: userLoginInfo.passwordLogin
          }}
          onHandleChangeInputText={handleChangeInputText}
          onHandleChangeInputError={handleChangeInputError}
          refBtnSubmit={refBtnSubmit}
          isLightTheme={false}
        />
      </div>
    </div>
    </>
  )
}

export default Login;