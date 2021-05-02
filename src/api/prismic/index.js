import { client } from './client';
import * as queries from './queries';

function queryClient(query) {
  return client
    .query({ query })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const fetchScreensData = () => {
  return queryClient(queries.getAllBaseScreens);
};

export const getScreens = async () => {
  const response = await queryClient(queries.getAllScreens);
  return response.allScreens.edges.reduce(
    (screens, screen) => ({
      ...screens,
      [screen.node._meta.uid]: transformData(screen.node, {
        ui_texts: (value) => value.reduce(getUITexts, {}),
      }),
    }),
    {}
  );
};

function transformData(node, matcher = {}) {
  return Object.keys(node).reduce((result, key) => {
    if (key.startsWith('__')) return result;
    const value = node[key];

    switch (key) {
      case '_meta':
        return {
          ...result,
          path: node._meta.uid,
        };
      default: {
        const hasMatcher = matcher[key];
        return {
          ...result,
          [key]: hasMatcher ? matcher[key](value) : value,
        };
      }
    }
  }, {});
}

function getUITexts(texts, { text_key, text_value }) {
  return {
    ...texts,
    [text_key]: text_value,
  };
}

export const getChapters = async () => {
  const response = await queryClient(queries.getAllChapters);
  // console.log('response.allChapters.edges', response.allChapters.edges);
  return response.allChapters.edges.reduce(
    (chapters, chapter) => ({
      ...chapters,
      [chapter.node._meta.uid]: transformData(chapter.node, {
        choices: (choices) =>
          choices.map((choice) => ({
            choice_text: choice.choice_text,
            chapter_link: choice.chapter_link?._meta.uid,
          })),
        body: (value) =>
          value.reduce(
            (res, curr) => {
              switch (curr.__typename) {
                case 'ChapterBodyAudioclip': {
                  const { ...media } = curr.primary.media;
                  return {
                    ...res,
                    audio: [...res.audio, { ...media }],
                  };
                }
                default:
                  console.log('Unhandled type', curr.__typename);
                  return { ...res, [curr.__typename]: curr };
              }
            },
            { audio: [], edges: {} }
          ),
      }),
    }),
    {}
  );
};
