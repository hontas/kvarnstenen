import { createSelector } from 'reselect';
import { nanoid } from 'nanoid/non-secure';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RootState } from './index';

/**
 * Constants
 */
const STORAGE_KEY = 'kvarnstenen-game-state';
const LOAD_SAVED_GAMES = 'LOAD_SAVED_GAMES';
const LOAD_SAVED_GAMES_SUCCESS = 'LOAD_SAVED_GAMES_SUCCESS';
const LOAD_SAVED_GAMES_FAIL = 'LOAD_SAVED_GAMES_FAIL';
const CREATE_NEW_SLOT = 'CREATE_NEW_SLOT';
const REMOVE_SLOT = 'REMOVE_SLOT';
const SET_CURRENT_CHAPTER = 'SET_CURRENT_CHAPTER';
const SET_CURRENT_SLOT = 'SET_CURRENT_SLOT';

export interface CurrentChapter {
  path: string;
  name: string;
  uid: string;
}

interface Slot {
  path: string[];
  currentIndex?: number;
  currentChapter?: CurrentChapter;
  updatedAt: number;
}

type Slots = Record<string, Slot>;
type SlotInArray = Slot & { id: string };
type SlotsArray = SlotInArray[];

export interface State {
  currentSlot: string;
  slots: Slots;
  isLoading: boolean;
}

type GetState = () => RootState;

interface Action {
  type: string;
  payload: Slots & CreateNewGamePayload & SetCurrentChapterPayload;
}

/**
 * Selectors
 */
export const selectCurrentSlotId = (state: RootState): string => state.game.currentSlot;
export const selectSlots = (state: RootState): Slots => state.game.slots;
export const selectSlotsList = createSelector<RootState, Slots, SlotsArray>(selectSlots, (slots) =>
  Object.entries(slots)
    .map(([id, slot]) => ({ id, ...slot }))
    .filter(({ path }) => Array.isArray(path) && path.length > 0)
);
export const selectCurrentSlot = createSelector<RootState, string, Slots, Slot>(
  [selectCurrentSlotId, selectSlots],
  (id, slots) => slots[id]
);

/**
 * Actions
 */
const persist = async (slots: Slots) => {
  console.log('Persisting slots state');
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(slots));
};

export const getSavedGameState = () => async (dispatch) => {
  dispatch({ type: LOAD_SAVED_GAMES });
  try {
    console.log('getting saved state');
    const value = await AsyncStorage.getItem(STORAGE_KEY);

    // eslint-disable-next-line unicorn/no-null
    if (value != null) {
      const payload: Slots = JSON.parse(value);
      console.log('saved state loaded');
      dispatch({ type: LOAD_SAVED_GAMES_SUCCESS, payload });
    } else {
      console.log('No saved state');
      dispatch({ type: LOAD_SAVED_GAMES_SUCCESS, payload: {} });
    }
  } catch (error) {
    console.log('e', error);
    dispatch({ type: LOAD_SAVED_GAMES_FAIL, payload: error });
  }
};

interface CreateNewGamePayload {
  slotId: string;
  slot: Slot;
}

export const createNewGame = () => async (dispatch, getState: GetState) => {
  const slotId = nanoid();
  const newSlot: Slot = {
    path: [],
    currentIndex: undefined,
    currentChapter: undefined,
    updatedAt: Date.now(),
  };
  const payload: CreateNewGamePayload = { slot: newSlot, slotId };

  dispatch({
    type: CREATE_NEW_SLOT,
    payload,
  });

  const { game } = getState();
  await persist(game.slots);
};

interface SetCurrentSlotPayload {
  slotId: string;
}

export const setCurrentSlot = (slotId: string) => async (dispatch, getState: GetState) => {
  const state = getState();
  const slots = selectSlots(state);

  if (!slots[slotId]) {
    console.log('Slot does not exist');
    return;
  }

  console.log(`Setting current slot to ${slotId}`);
  const payload: SetCurrentSlotPayload = { slotId };
  dispatch({ type: SET_CURRENT_SLOT, payload });
};

interface RemoveSlotPayload {
  slotId: string;
}

export const removeSlot = (slotId: string) => async (dispatch, getState: GetState) => {
  const state = getState();
  const slots = selectSlots(state);

  if (!slots[slotId]) {
    console.log('Slot does not exist');
    return;
  }

  console.log(`Removing slot ${slotId}`);
  const payload: RemoveSlotPayload = { slotId };
  dispatch({ type: REMOVE_SLOT, payload });

  await persist(selectSlots(getState()));
};

interface SetCurrentChapterPayload {
  currentChapter: CurrentChapter;
  updatedAt: number;
}

export const setCurrentChapter = (chapterPath: string, chapterName: string) => async (
  dispatch,
  getState: GetState
) => {
  if (!chapterPath) {
    console.warn('[setCurrentChapter] chapterPath must be set');
    return;
  }

  const state = getState();
  const currentSlot = selectCurrentSlot(state);
  const currentSlotId = selectCurrentSlotId(state);

  if (!currentSlot) {
    console.log('Slot must be selected in order to set current chapter');
    return;
  }

  if (currentSlot.currentChapter?.path !== chapterPath) {
    console.log(`Setting current chapter of slot ${currentSlotId} to`, chapterPath);
    const currentChapter: CurrentChapter = {
      path: chapterPath,
      name: chapterName || chapterPath,
      uid: chapterPath.split('/')[1],
    };
    const payload: SetCurrentChapterPayload = { currentChapter, updatedAt: Date.now() };
    dispatch({ type: SET_CURRENT_CHAPTER, payload });

    const { game } = getState();
    await persist(game.slots);
  }
};

/**
 * Reducer
 */
const initialState: State = {
  currentSlot: 'xxx',
  slots: {},
  isLoading: false,
};

export default function reducer(state = initialState, action: Action) {
  switch (action.type) {
    case LOAD_SAVED_GAMES: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOAD_SAVED_GAMES_SUCCESS: {
      return {
        ...state,
        currentSlot: undefined,
        slots: action.payload,
        isLoading: false,
      };
    }

    case LOAD_SAVED_GAMES_FAIL: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CREATE_NEW_SLOT: {
      const { slot, slotId } = action.payload as CreateNewGamePayload;

      return {
        ...state,
        currentSlot: slotId,
        slots: {
          ...state.slots,
          [slotId]: slot,
        },
      };
    }

    case REMOVE_SLOT: {
      const { slotId } = action.payload as RemoveSlotPayload;
      const newSlots = { ...state.slots };
      delete newSlots[slotId];

      return {
        ...state,
        slots: newSlots,
      };
    }

    case SET_CURRENT_SLOT: {
      const { slotId } = action.payload as SetCurrentSlotPayload;

      return {
        ...state,
        currentSlot: slotId,
      };
    }

    case SET_CURRENT_CHAPTER: {
      const currentSlot = state.slots[state.currentSlot];
      const { currentChapter, updatedAt } = action.payload as SetCurrentChapterPayload;
      const updatedSlot: Slot = {
        ...currentSlot,
        path: [...currentSlot.path, currentChapter.path],
        currentChapter: currentChapter,
        updatedAt,
      };

      return {
        ...state,
        slots: {
          ...state.slots,
          [state.currentSlot]: updatedSlot,
        },
      };
    }

    default:
      return state;
  }
}
