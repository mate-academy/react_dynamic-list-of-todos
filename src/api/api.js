// eslint-disable-next-line
const BASE_URL = 'https://mate-api.herokuapp.com';

export const getTodos = () => {
  const url = `${BASE_URL}${'/todos'}`;

  return fetch(url)
    .then(response => response.json())
    .then(response => response.data);
};

export const getUser = (userId) => {
  const url = `${BASE_URL}${'/users'}${userId}`;

  return fetch(url)
    .then(response => response.json())
    .then(response => response.data);
};
