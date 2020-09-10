const TODO_API = 'https://mate-api.herokuapp.com/todos';
const USERS_API = 'https://mate-api.herokuapp.com/users';

export const getTodos = () => (
  fetch(TODO_API)
    .then(response => response.json())
    .then(result => result.data)
);

export const getUser = userId => (
  fetch(`${USERS_API}/${userId}`)
    .then(response => response.json())
    .then(result => result.data)
);
