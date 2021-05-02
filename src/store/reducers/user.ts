/**
 * Constants
 */
const SET_USER_NAME = 'SET_USER_NAME';

/**
 * Actions
 */

export function setUserName(name) {
  return {
    type: SET_USER_NAME,
    payload: name,
  };
}

/**
 * Selectors
 */

export const selectUserName = (state) => state.user.name;

/**
 * Reducer
 */

const initialState = {
  name: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME: {
      return {
        ...state,
        name: action.payload,
      };
    }

    default:
      return state;
  }
}
