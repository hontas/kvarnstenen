import * as prismic from '../../api/prismic';

/**
 * Constants
 */

const FETCH_CONFIG = 'FETCH_CONFIG';
const FETCH_CONFIG_SUCCESS = 'FETCH_CONFIG_SUCCESS';
const FETCH_CONFIG_ERROR = 'FETCH_CONFIG_ERROR';

/**
 * Actions
 */

const fetchConfigStarted = () => ({
  type: FETCH_CONFIG,
});

const fetchConfigSuccess = (data) => ({
  type: FETCH_CONFIG_SUCCESS,
  payload: data,
});

const fetchConfigError = (error) => ({
  type: FETCH_CONFIG_ERROR,
  payload: error,
});

export const getConfig = () => async (dispatch) => {
  dispatch(fetchConfigStarted());

  try {
    const config = await prismic.fetchConfigData();
    dispatch(fetchConfigSuccess(config));
  } catch (error) {
    dispatch(fetchConfigError(error.toString()));
  }
};

/**
 * Selectors
 */

export const selectConfig = (state) => state.config.data;

/**
 * Reducer
 */

const initialState = {
  isLoading: false,
  error: undefined,
  data: {
    text_color_primary: '#ffffff',
    background_color_primary: '#000000',
    background_color_gradient_primary: '#400000',
    text_color_dim: '#99201c',
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CONFIG: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCH_CONFIG_SUCCESS: {
      console.log('FETCH_CONFIG_SUCCESS', action.payload);
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    }

    case FETCH_CONFIG_ERROR: {
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
