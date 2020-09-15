const TODOS_API = `https://mate-api.herokuapp.com`;

export const getTodos = () => (
  fetch(`${TODOS_API}/todos/`)
    .then(response => response.json())
    .then(result => result.data)
);

export const getUser = userId => (
  fetch(`${TODOS_API}/users/${userId}/`)
    .then(response => response.json())
    .then(result => result.data)
);
