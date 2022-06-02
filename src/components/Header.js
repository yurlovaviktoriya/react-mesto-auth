import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import logo from '../images/logo.svg';

/**
 * Функция генерирует компонент шапка сайта
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function Header({ isMain, btnText, link, onExitClick }) {

  const currentUserContext = useContext(CurrentUserContext);
  const userEmail = isMain? currentUserContext.loggedIn ? currentUserContext.isEmail : '' : '';

  const authButtonClassName =  `button header__auth-btn ${isMain ? 'header__auth-btn_type_grey' : 'header__auth-btn_type_white'}`
  const buttonElement = isMain ?
      (<button className={authButtonClassName} onClick={onExitClick}>{btnText}</button>) :
      (<Link to={link}><button className={authButtonClassName}>{btnText}</button></Link>)

  return (
    <header className="header page__header">
      <a className="link" href="#" target="_self">
        <img className="header__logo" src={logo} alt="Логотип Mesto Russia"/>
      </a>
      <div className="header__auth-block">
        <p className="header__text">{userEmail}</p>
        {buttonElement}
      </div>
    </header>
  )
}


export default Header;
