import React, { useContext } from 'react';

import Header from './Header';
import Card from './Card';
import Footer from "./Footer";

import { CurrentUserContext } from "../contexts/CurrentUserContext";


/**
 * Функция генерирует компонент с основным содержанием страницы
 * @param props - Данные, включая обработчики кликов onEditAvatar, onEditProfile, onAddPlace
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, onExitClick }) {

  const userInfo = useContext(CurrentUserContext);
  const { name, about, avatar } = userInfo.currentUser;

  return (
    <>
    <Header
      isMain={true}
      btnText={'Выйти'}
      onExitClick={onExitClick}
    />
    <main className="content">
      <section className="profile page__profile">
        <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
        <img className="profile__avatar" src={avatar} alt="Аватар пользователя" />
          <div className="profile__info">
            <h1 className="profile__title">{name}</h1>
            <button className="profile__edit-btn button" type="button" aria-label="Редактировать профиль"
              onClick={onEditProfile}></button>
            <p className="profile__subtitle">{about}</p>
          </div>
          <button className="profile__add-btn button" type="button" aria-label="Добавить новое место"
            onClick={onAddPlace}></button>
      </section>

      <section className="places page__places">
        {cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
    <Footer />
    </>
  )
}

export default Main;
