import React, { useState, useEffect } from 'react';
import { Route, Switch, useHistory } from "react-router-dom";

import Register from './Register';
import Login from './Login';
import Main from './Main';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import InfoToolTip from './InfoToolTip';

import ProtectedRoute from './ProtectedRoute';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { api } from '../utils/api';
import * as auth from '../utils/auth';


/**
 * Функция генерирует главный компонент приложения
 * @returns {JSX.Element}
 * @constructor
 */
function App() {

  const history = useHistory();

  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: ''});
  const {_id: userId} = currentUser;
  const [loggedIn, setLoggedIn] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(null);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [isEmail, setIsEmail] = useState('');


  useEffect(() => {
    api.getProfileInfo()
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);


  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);


  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getEmail(token)
      .then(data => {
        setIsEmail(data.data.email);
        setLoggedIn(true);
        history.push('/');
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, []);


  /**
   * Функция делает запрос к серверу на регистрацию пользователя
   * @param email
   * @param password
   */
  function handleRegisterSubmit({ email, password }) {
    setIsLoading(true);

    auth.register(email, password)
      .then((res) => {
        console.log(res);
        setIsInfoToolTipOpen(true);
        setIsRegisterSuccess(true);
        history.push('/sign-in');
      })
      .catch(err => {
        setIsInfoToolTipOpen(true);
        setIsRegisterSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }


  /**
   * Функция делает запрос к серверу на аутентификацию пользователя
   * @param email
   * @param password
   */
  function handleLoginSubmit({ email, password }) {
    setIsLoading(true);

    auth.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        setLoggedIn(true);
        setIsEmail(email);
        history.push('/');
      })
      .catch(err => {
        setIsInfoToolTipOpen(true);
        setIsRegisterSuccess(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }


  /**
   * Функция обрабатывает клик по кнопке выхода из приложения
   */
  function handleExitClick() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setIsEmail(null);
  }


  /**
   * Функция обрабатывает нажатие кнопки лайк, делает запрос к серверу и обрабатывает ответ
   * @param card
   */
  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === userId);


    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
    .catch(err => {
      console.log(err);
    })
  }


  /**
   * Функция обрабатывает нажатие кнопки корзины для удаления карточки, делает запрос к серверу и обрабатывает ответ
   * @param card
   */
  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => {
        console.log(err);
      })
  }


  /**
  * Функция обрабатывает клик по кнопке редактирования аватара
  */
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }


  /**
  * Функция обрабатывает клик по кнопке редактирования профиля
  */
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }


  /**
  * Функция обрабатывает клик по кнопке добавления нового места
  */
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  }


  /**
  * Функция обрабатывает клик по изображению на карточке места
  */
  const handleCardClick = (card) => {
    setSelectedCard(card);
  }



  /**
   * Функция делает запрос к серверу для обновления информации о пользователе и обрабатывает ответ
   * @param userInfo
   */
  const handleUpdateUser = (userInfo) => {
    setIsLoading(true);
    api.editProfileInfo(userInfo)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  /**
   * Функция делает запрос к серверу для обновления аватара пользователя и обрабатывает ответ
   * @param avatar
   */
  const handleUpdateAvatar = (avatar) => {
    setIsLoading(true);
    api.updateAvatar(avatar)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  /**
   * Функция делает запрос к серверу для одобавления нового места и обрабатывает ответ
   * @param name
   * @param link
   */
  const handleAddPlaceSubmit = ({ namePlace: name, urlPlaceImg: link }) => {
    setIsLoading(true);
    api.addCard({name, link})
      .then(res => {
        setCards([...cards, res]);
      })
      .catch(err => {
        console.log(err);
      })
      .then(() => {
        closeAllPopups();
      })
      .finally(() => {
        setIsLoading(false);
      });
  }


  /**
  * Функция обрабатывает клик по кнопке-крестику для закрытия попапа
  */
  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoToolTipOpen(false);
    setIsRegisterSuccess(null);
  }


  return (
    <CurrentUserContext.Provider value={{currentUser, loggedIn, isEmail}}>
      <div className="root">
        <div className="page root__page">
          <Switch>
            <Route path="/sign-up" >
              <Register
                onRegister={handleRegisterSubmit}
                isLoading={isLoading}
              />
            </Route>
            <Route path="/sign-in" >
              <Login
               onLogin={handleLoginSubmit}
               isLoading={isLoading}
              />
            </Route>
            <ProtectedRoute
                exact path="/"
                component={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                cards={cards}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onExitClick={handleExitClick}
            />
          </Switch>
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
          isLoading={isLoading}
        />

        <ImagePopup
          name={'view-place'}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoToolTip
          isSuccess={isRegisterSuccess}
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
