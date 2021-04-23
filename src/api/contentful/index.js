import * as schema from './schema';
import { client } from './client';

export const getChapters = () =>
  client
    .query({
      query: schema.allChapters,
    })
    .then(({ data, loading, networkStatus }) => {
      return { data, loading, networkStatus };
    });

export const getScreens = () =>
  client
    .query({
      query: schema.allScreens,
    })
    .then(({ data, loading, networkStatus }) => {
      const screens = data.screenCollection.items.reduce(
        (screens, screen) => ({
          ...screens,
          [screen.path]: screen,
        }),
        {}
      );
      return screens;
    });
