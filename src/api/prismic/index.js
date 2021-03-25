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

export const fetchAllChapters = async () => {
  const response = await queryClient(queries.getAllChapters);
  return response.allChapters.edges.map((chapter) => ({
    path: chapter.node._meta.uid,
    name: chapter.node.name,
  }));
};
