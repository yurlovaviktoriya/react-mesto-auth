import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function ProtectedRoute({component: Component, ...props}) {

  const loggedIn = useContext(CurrentUserContext).loggedIn;

  return(
    <Route>
      {
        () =>
          loggedIn ? <Component {...props}/> : <Redirect to={'/sign-in'} />
      }
    </Route>
  )
}

export default ProtectedRoute;