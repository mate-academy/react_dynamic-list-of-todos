/* eslint-disable prefer-promise-reject-errors */
const API_URL = 'https://mate.academy/students-api';

export const getTodos = () => {
  return fetch(`${API_URL}/todos`)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject('Cannot process the request')
    ));
};

export const getUser = (id) => {
  return fetch(`${API_URL}/users/${id}`)
    .then(response => (response.ok
      ? response.json()
      : Promise.reject('Cannot process the request')));
};
