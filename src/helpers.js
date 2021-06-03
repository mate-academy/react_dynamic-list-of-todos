const BASE_URL = 'https://mate-api.herokuapp.com';

export const request = (url, options) => fetch(
  !options
    ? `${BASE_URL}${url}`
    : `${BASE_URL}${url}`, options,
)
  .then(result => result.json());
