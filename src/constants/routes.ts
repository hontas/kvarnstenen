export const chapterRoutePrefix = 'chapter';
export const getChapterRouteName = (path) => `${chapterRoutePrefix}/${path}`;

export const ROUTE_NAMES = {
  HOME: 'home',
  HOW_TO_PLAY: 'help/howto',
  CONTINUE_GAME: 'game/continue',
  NEW_GAME: 'game/new',
  GAME_LOADING: 'game/loading',
  START_GAME: 'game/start',
} as const;
