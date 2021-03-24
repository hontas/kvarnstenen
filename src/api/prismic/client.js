import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

export const client = new ApolloClient({
  link: PrismicLink({
    uri: process.env.PRISMIC_GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache(),
});
