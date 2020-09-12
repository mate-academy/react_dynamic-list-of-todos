/* eslint-disable arrow-body-style */
const BASE_URL = 'https://mate-api.herokuapp.com';

// eslint-disable-next-line arrow-body-style
export const getTodos = () => {
  return fetch(`${BASE_URL}/todos`)
    .then(resp => resp.json())
    .then(resp => resp.data);
};

export const getUser = (id) => {
  return fetch(`${BASE_URL}/users/${id}`)
    .then(resp => resp.json())
    .then(resp => resp.data);
};
