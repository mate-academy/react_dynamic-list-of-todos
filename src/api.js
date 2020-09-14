const URL_BASE = 'https://mate-api.herokuapp.com/';

export function getTodoData() {
  return fetch(`${URL_BASE}todos`)
    .then(response => response.json())
    .then(todoData => todoData.data);
}

export function getUserData(userId) {
  return fetch(`${URL_BASE}users/${userId}`)
    .then(response => response.json())
    .then(userData => userData.data);
}
