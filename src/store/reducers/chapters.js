import * as prismic from '../../api/prismic';

/**
 * Constants
 */
const FETCH_CHAPTERS = 'FETCH_CHAPTERS';
const FETCH_CHAPTERS_SUCCESS = 'FETCH_CHAPTERS_SUCCESS';
const FETCH_CHAPTERS_ERROR = 'FETCH_CHAPTERS_ERROR';

/**
 * Actions
 */

function fetchStarted() {
  return {
    type: FETCH_CHAPTERS,
  };
}

function getChaptersSuccess(payload) {
  return {
    type: FETCH_CHAPTERS_SUCCESS,
    payload,
  };
}

function getChaptersError(payload) {
  return {
    type: FETCH_CHAPTERS_ERROR,
    payload,
  };
}

export const getChapters = () => async (dispatch) => {
  console.log('fetch chapters');
  dispatch(fetchStarted());
  try {
    const chapters = await prismic.getChapters();
    // console.log('chapters', chapters);
    dispatch(getChaptersSuccess(chapters));
    console.log('fetch chapters success');
  } catch (error) {
    console.log('getChapters Error', error);
    dispatch(getChaptersError(error));
  }
};

/**
 * Selectors
 */

export const selectChapters = (state) => state.chapters.chapters;
export const selectChaptersLoading = (state) => state.chapters.isLoading;

/**
 * Reducer
 */

const initialState = {
  isLoading: false,
  chapters: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CHAPTERS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case FETCH_CHAPTERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        chapters: action.payload,
      };
    }

    case FETCH_CHAPTERS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return state;
  }
}
