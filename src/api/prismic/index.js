import { client } from './client';
import * as queries from './queries';

function queryClient(query) {
  return client
    .query({ query })
    .then((response) => {
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export const fetchScreensData = () => {
  return queryClient(queries.getAllBaseScreens);
};

export const fetchAllChapters = () => {
  return queryClient(queries.getAllChapters);
};
