const BASE_URL = 'https://mate-api.herokuapp.com/';

export const request = () => (
  fetch(`${BASE_URL}todos`)
    .then(res => res.json())
    .then(res => res.data)
);

export const getUser = userId => (
  fetch(`${BASE_URL}users/${userId}`)
    .then(res => res.json())
);
