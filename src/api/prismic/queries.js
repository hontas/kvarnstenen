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

export const getAllScreens = gql`
  query {
    allScreens {
      edges {
        node {
          name
          title
          background_color
          text_color
          ui_texts {
            text_key
            text_value
          }
          _meta {
            uid
          }
        }
      }
    }
  }
`;

export const getAllChapters = gql`
  query {
    allChapters {
      edges {
        node {
          name
          choices_headline
          choices {
            choice_text
            chapter_link {
              ... on Chapter {
                _meta {
                  uid
                }
              }
            }
          }
          body {
            ... on ChapterBodyAudioclip {
              type
              primary {
                media {
                  ... on _FileLink {
                    url
                    size
                    name
                  }
                }
              }
            }
          }
          _meta {
            uid
          }
        }
      }
    }
  }
`;
