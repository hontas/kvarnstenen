import { gql } from '@apollo/client';

export const allScreens = gql`
  query getScreens {
    screenCollection {
      items {
        path
        title
        texts
      }
    }
  }
`;

export const allChapters = gql`
  query getChapters {
    chapterCollection {
      items {
        name
        path
        chapterLinkCollection {
          items {
            path
          }
        }
      }
    }
  }
`;
