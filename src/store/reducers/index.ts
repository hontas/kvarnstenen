import { combineReducers } from 'redux';

import screens from './screens';
import chapters from './chapters';
import localState from './localState';
import config from './config';
import game, { State as GameState } from './game';

export default combineReducers({
  screens,
  chapters,
  localState,
  game,
  config,
});

export interface RootState {
  game: GameState;
}
