const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

const repoId = 'kvarnstenen';

fetch(`https://${repoId}.prismic.io/api`)
  .then((r) => r.json())
  .then((data) => {
    const reference = data.refs.find((r) => r.id === 'master');
    if (!reference) return;
    fetch(
      `https://${repoId}.prismic.io/graphql?query=%7B%20__schema%20%7B%20types%20%7B%20kind%20name%20possibleTypes%20%7B%20name%20%7D%20%7D%20%7D%20%7D`,
      {
        headers: {
          'prismic-ref': reference.ref,
        },
      }
    )
      .then((result) => result.json())
      .then((result) => {
        const filteredResults = result;
        const filteredData = result.data.__schema.types.filter((type) => type.possibleTypes !== null);
        filteredResults.data.__schema.types = filteredData;
        fs.writeFileSync(
          path.resolve(__dirname, '../src/utils/fragmentTypes.json'),
          JSON.stringify(filteredResults.data),
          (error) => {
            if (error) {
              console.error('Error writing fragmentTypes file', error);
            } else {
              console.log('Fragment types successfully extracted!');
            }
          }
        );
      });
  });
