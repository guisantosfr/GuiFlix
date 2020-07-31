import config from '../config';

const URL_VIDEOS = `${config.URL}/videos`;

function create(videoObject) {
  return fetch(`${URL_VIDEOS}?_embed=videos`, {
    method:'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(videoObject),
  })
    .then(async (response) => {
      const resposta = await response.json();
      return resposta;
    });
}

export default {
  create,
};
