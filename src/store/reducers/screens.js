import * as prismic from '../../api/prismic';

/**
 * Constants
 */
const FETCH_SCREENS = 'FETCH_SCREENS';
const FETCH_SCREENS_SUCCESS = 'FETCH_SCREENS_SUCCESS';
const FETCH_SCREENS_ERROR = 'FETCH_SCREENS_ERROR';

/**
 * Actions
 */

function fetchStarted() {
  return {
    type: FETCH_SCREENS,
  };
}

function getScreensDataSuccess(payload) {
  return {
    type: FETCH_SCREENS_SUCCESS,
    payload,
  };
}

function getScreensDataError(payload) {
  return {
    type: FETCH_SCREENS_ERROR,
    payload,
  };
}

export const getScreensData = () => async (dispatch) => {
  dispatch(fetchStarted());
  try {
    const response = await prismic.getScreens();
    dispatch(getScreensDataSuccess(response));
  } catch (error) {
    console.log('error', error);
    dispatch(getScreensDataError(error));
  }
};

/**
 * Selectors
 */

export const selectScreen = (screenName) => (state) => state.screens.screens[screenName];
export const selectHomeScreen = (state) => state.screens.screens.HomeScreen;
export const selectScreensLoading = (state) => state.screens.isLoading;
export const selectScreensError = (state) => state.screens.error;

/**
 * Reducer
 */

const initialState = {
  isLoading: false,
  error: null,
  screens: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SCREENS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCH_SCREENS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
        screens: action.payload,
      };
    }

    case FETCH_SCREENS_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
