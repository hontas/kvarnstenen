import * as React from 'react';
import PropTypes from 'prop-types';

const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(userReducer, {});
  const setUserName = (name) => dispatch(setUserNameAC(name));

  return <UserContext.Provider value={{ user: state, setUserName }}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.element,
};

export const useUser = () => {
  return React.useContext(UserContext);
};

/**
 * Constants
 */

const SET_USER_NAME = 'SET_USER_NAME';

/**
 * Reducer
 */

function userReducer(state, action) {
  switch (action.type) {
    case SET_USER_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

/**
 * Actions
 */

function setUserNameAC(name) {
  return {
    type: SET_USER_NAME,
    payload: name,
  };
}
