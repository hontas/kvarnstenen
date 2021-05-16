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

const fetchChapters = async (after) => {
  console.log('[fetchChapters] start');
  const response = await queryClient(queries.getAllChapters(after));

  if (!response.allChapters) {
    console.log('[fetchChapters] error', response);
    throw new Error('Could not fetch chapters');
  }

  const { totalCount, pageInfo, edges } = response.allChapters;

  console.log(
    `[fetchChapters] fetched ${edges.length} of ${totalCount}. Has more: ${pageInfo.hasNextPage}`
  );

  return response;
};

const transformChapters = (edges) => {
  return edges.reduce(
    (chapters, chapter) => ({
      ...chapters,
      [chapter.node._meta.uid]: transformData(chapter.node, {
        choices: (choices) =>
          choices.map((choice) => ({
            ...choice,
            chapter_link: choice.chapter_link?._meta.uid,
          })),
      }),
    }),
    {}
  );
};

export const getChapters = async () => {
  console.log('[getChapters] start');
  let hasMore = true;
  let lastCursor;
  let allEdges = [];

  while (hasMore) {
    const response = await fetchChapters(lastCursor);
    const { pageInfo, edges } = response.allChapters;
    const { hasNextPage, endCursor } = pageInfo;

    allEdges = [...allEdges, ...edges];
    hasMore = hasNextPage;
    lastCursor = endCursor;
  }

  console.log(`[getChapters] got ${allEdges.length} chapters`);

  return transformChapters(allEdges);
};
