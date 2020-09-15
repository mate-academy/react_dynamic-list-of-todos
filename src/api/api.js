const BASE_URL = 'https://mate-api.herokuapp.com';

export const fetchTodos = () => (
  fetch(`${BASE_URL}/todos/`)
    .then(response => response.json())
    .then(result => result.data)
);

export const fetchUser = userId => (
  fetch(`${BASE_URL}/users/${userId}`)
    .then(response => response.json())
    .then(json => json.data)
);
