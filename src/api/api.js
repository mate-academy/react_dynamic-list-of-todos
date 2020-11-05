const API_URL_TODOS = 'https://mate-api.herokuapp.com/todos';
const API_URL_USERS = 'https://mate-api.herokuapp.com/users/';

export function getToDos() {
  return fetch(API_URL_TODOS)
    .then(prepareResponse)
    .then(getData);
}

export function getUser(userId) {
  return fetch(`${API_URL_USERS}${userId}`)
    .then(prepareResponse)
    .then(getData);
}

const prepareResponse = response => response.json();
const getData = result => result.data;
