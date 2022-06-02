import React, {useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

/**
 * Функция генерирует компонент карточку места
 * @param props - Данные для заполнения карточки места
 * @returns {JSX.Element} - Разметка компонента
 * @constructor
 */
function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const userInfo = useContext(CurrentUserContext);
  const { _id: userId } = userInfo.currentUser;

  const isOwn = card.owner._id === userId;
  const cardDeleteButtonClassName = (
    `card__btn-del ${isOwn ? 'card__btn-del_type_visible' : 'card__btn-del_type_hidden'}`
  );


  const isLiked = card.likes.some(i => i._id === userId);
  const cardLikeButtonClassName = (
    `card__btn-like ${isLiked ? 'card__btn-like_active' : ''}`
  );

  /**
   * Функция обрабатывает клик по карточке
   */
  const cardClick = () => {
    onCardClick(card);
  }

  const cardLike = () => {
    onCardLike(card);
  }

  const cardDelete = () => {
    onCardDelete(card);
  }

  return (
    <article className="card">
      <img className="card__img" src={card.link} alt={`Изображение места ${card.name}`} onClick={cardClick}/>
      <h2 className="card__title">{card.name}</h2>
      <button className={cardLikeButtonClassName} type="button" aria-label="Поставить лайк" onClick={cardLike}></button>
      <p className="card__counter-like">{card.likes.length}</p>
      <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить карточку с местом"
        onClick={cardDelete}></button>
    </article>
  )
}


export default Card;
