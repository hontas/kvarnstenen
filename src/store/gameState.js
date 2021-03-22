const uuid = 'xxxxYYY666zzz';

const appState = {
  user: 'uuid',
  savedGameStates: {
    [uuid]: {},
  },
  screens: {
    start: {},
    howTo: {},
    savedGames: {},
    settings: {},
  },
};

const userState = {
  name: 'xxx',
  id: 'uuid',
  saveSlot: '', // where to auto-save progress
};

const gameState = {
  currentStory: '',
  currentChapter: '',
  stories: {
    [uuid]: {
      name: '',
      chapters: [
        {
          id: 'uuid',
          name: '1:2',
        },
      ],
    },
  },
};
