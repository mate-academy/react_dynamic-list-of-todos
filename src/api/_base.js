const BASE_URL = 'https://mate-api.herokuapp.com';

export const get = url => fetch(`${BASE_URL}${url}`)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject();
  })
  .then(result => result.data);
