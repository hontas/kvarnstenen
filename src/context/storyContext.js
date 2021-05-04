import * as React from 'react';
import PropTypes from 'prop-types';

const StoryContext = React.createContext();

const initialState = {};

export const StoryProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const setUserName = (name) => dispatch(setUserNameAC(name));

  return <StoryContext.Provider value={{ user: state, setUserName }}>{children}</StoryContext.Provider>;
};

StoryProvider.propTypes = {
  children: PropTypes.element,
};

export const useStory = () => {
  return React.useContext(StoryContext);
};

/**
 * Constants
 */

const SET_USER_NAME = 'SET_USER_NAME';

/**
 * Reducer
 */

function reducer(state, action) {
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
