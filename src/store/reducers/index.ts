import { combineReducers } from 'redux';

import screens from './screens';
import chapters from './chapters';
import user from './user';

export default combineReducers({
  screens,
  chapters,
  user,
});
