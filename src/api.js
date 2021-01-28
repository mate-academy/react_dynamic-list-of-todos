const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(`${BASE_URL}${url}`, options)
  .then((result) => {
    if (!result.ok) {
      throw new Error(`${result.status} - ${result.statusText}`);
    }

    return result.json();
  });
