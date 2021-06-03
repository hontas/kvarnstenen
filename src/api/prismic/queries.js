import gql from 'graphql-tag';

export const getConfig = gql`
  query {
    allApp_configs {
      edges {
        node {
          text_color_primary
          background_color_primary
          background_color_gradient_primary
          text_color_dim
          button_background_primary
          button_text_color_primary
          button_background_secondary
          button_text_color_secondary
          button_text_color_link
        }
      }
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
          media {
            ... on _FileLink {
              name
              url
              size
            }
          }
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
            show_name
            audio {
              ... on _FileLink {
                url
                size
                name
              }
            }
            image
            geo_location
            geo_location_title
            geo_location_image
            geo_location_description
            choices_headline
            choices {
              choice_type
              choice_text
              hide_help_text
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
