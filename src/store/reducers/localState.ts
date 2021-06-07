/**
 * Constants
 */

const UPDATE_AVAILABLE = 'UPDATE_AVAILABLE';
const UPDATE_AVAILABLE_DISMISS = 'UPDATE_AVAILABLE_DISMISS';
const SET_VOLUME = 'SET_VOLUME';
const READ_LOCAL_STATE = 'READ_LOCAL_STATE';

/**
 * Actions
 */

export const updateAvailable = () => ({
  type: UPDATE_AVAILABLE,
});

export const dismissUpdateAvailable = () => ({
  type: UPDATE_AVAILABLE_DISMISS,
});

export const init = () => (dispatch) => {
  // read local state
  // update store
  dispatch({ type: READ_LOCAL_STATE });
};

export const setVolume = (volume: number) => (dispatch) => {
  dispatch({
    type: SET_VOLUME,
    payload: Math.min(Math.max(volume, 0), 1),
  });
  // persist to local storage
};

/**
 * Selectors
 */

export const selectUpdateAvailable = (state) => state.localState.updateAvailable;

/**
 * Reducer
 */

const initialState = {
  updateAvailable: false,
  volume: 0.75,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_AVAILABLE: {
      return {
        ...state,
        updateAvailable: true,
      };
    }

    case UPDATE_AVAILABLE_DISMISS: {
      return {
        ...state,
        updateAvailable: false,
      };
    }

    case SET_VOLUME: {
      return {
        ...state,
        volume: action.payload,
      };
    }

    default:
      return state;
  }
}
