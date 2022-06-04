import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import Header from './Header';
import Form from "./Form";


/**
 * Функция генерирует компонент формы с регистрацией пользователя
 * @param props - Данные для компонента
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function Register({ onRegister, isLoading }) {

  const btnText = isLoading ? 'Регистрация...' : 'Зарегистрироваться';

  const [userRegisterInfo, setUserRegisterInfo]  = useState({
    emailRegister: '',
    passwordRegister: ''
  })

  const [inputErrors, setInputErrors] = useState({
    emailRegister: false,
    passwordRegister: false
  });

  const refBtnSubmit = useRef();


  /**
   * Функция отправляет данные с инпута в функцию изменения стейта информации о регистрации пользователя
   * @param evt
   */
  const handleChangeInputText = (evt) => {
    setUserRegisterInfo(state => ({...state, [evt.target.name] : evt.target.value}));
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

    onRegister({
      email: userRegisterInfo.emailRegister,
      password: userRegisterInfo.passwordRegister
    });
  }


  return (
    <>
    <Header
      isMain={false}
      btnText={'Войти'}
      link={'/sign-in'}
    />
    <div className="auth">
      <div className="auth__form-container">
        <Form
          name={'register'}
          title={'Регистрация'}
          btnText={btnText}
          inputs={[
            {
              inputType: 'email',
              inputId: 'input-register-email',
              inputName: 'emailRegister',
              placeholder: 'Email'
            },
              {
              inputType: 'password',
              inputId: 'input-register-password',
              inputName: 'passwordRegister',
              placeholder: 'Пароль'
            }
          ]}
          onSubmit={handleSubmit}
          inputData={{
            emailRegister: userRegisterInfo.emailRegister,
            passwordRegister: userRegisterInfo.passwordRegister
          }}
          onHandleChangeInputText={handleChangeInputText}
          onHandleChangeInputError={handleChangeInputError}
          refBtnSubmit={refBtnSubmit}
          isLightTheme={false}
        />
        <p className="auth__text">Уже зарегистрированы? <Link to="/sign-in" className="link">Войти</Link></p>
      </div>
    </div>
      </>
  )
}

export default Register;