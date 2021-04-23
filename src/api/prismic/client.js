import { PrismicLink } from 'apollo-link-prismic';
import { InMemoryCache, IntrospectionFragmentMatcher } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';

import fragmentTypes from '../../utils/fragmentTypes.json';
const fragmentMatcher = new IntrospectionFragmentMatcher({ introspectionQueryResultData: fragmentTypes });

export const client = new ApolloClient({
  link: PrismicLink({
    uri: process.env.PRISMIC_GRAPHQL_ENDPOINT,
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});
