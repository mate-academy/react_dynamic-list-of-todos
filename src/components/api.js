const BASE_URL = 'https://mate.academy/students-api';

export const getTodos = (url) => {
  return fetch(`${BASE_URL}/${url}`)
    .then(data => data);
};

export const getUser = (userID) => fetch(`${BASE_URL}/users/${userID}`)
  .then(person => person)
  .then(person => person.json());
