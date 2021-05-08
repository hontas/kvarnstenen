import { combineReducers } from 'redux';

import screens from './screens';
import chapters from './chapters';
import user from './user';
import game, { State as GameState } from './game';

export default combineReducers({
  screens,
  chapters,
  user,
  game,
});

export interface RootState {
  game: GameState;
}
