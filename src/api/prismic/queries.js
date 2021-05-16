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

// prismic API has a max limit of 50
const LIMIT = 20;

export const getAllChapters = (after) => {
  const queryArguments = after ? `after: "${after}", first: ${LIMIT}` : `first: ${LIMIT}`;

  return gql`
    query {
      allChapters(${queryArguments}) {
        totalCount
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            name
            audio {
              ... on _FileLink {
                url
                size
                name
              }
            }
            geo_location
            geo_location_title
            geo_location_image
            geo_location_description
            choices_headline
            choices {
              choice_type
              choice_text
              chapter_link {
                ... on Chapter {
                  _meta {
                    uid
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
};
