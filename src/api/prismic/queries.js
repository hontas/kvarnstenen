import gql from 'graphql-tag';

export const getAllBaseScreens = gql`
  query {
    homescreen(uid: "home", lang: "sv-se") {
      title
      cover_image
      new_game_button_text
      continue_game_button_text
      how_to_play_button_text
    }
  }
`;

export const getAllChapters = gql`
  query {
    allChapters {
      edges {
        node {
          name
          _meta {
            uid
          }
          body {
            ... on ChapterBodyText {
              fields {
                paragraph
              }
            }
            ... on ChapterBodyEdges {
              fields {
                link_text
                chapter_link {
                  ... on Chapter {
                    name
                    _meta {
                      uid
                    }
                  }
                  _linkType
                  __typename
                }
              }
            }
            ... on ChapterBodyAudioclip {
              primary {
                media {
                  __typename
                }
                embed
              }
            }
          }
        }
      }
    }
  }
`;
