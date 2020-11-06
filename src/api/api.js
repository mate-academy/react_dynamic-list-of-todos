const BASE_URL = 'https://mate-api.herokuapp.com';

export function getTodos() {
  return fetch(`${BASE_URL}/todos/`)
    .then(response => (!response.ok
      ? new Error(`${response.status} - ${response.statusText}`)
      : response.json().then(result => result.data)));
}

export const getUser = userId => fetch(`${BASE_URL}/users/${userId}`)
  .then(response => response.json())
  .then(result => result.data);
