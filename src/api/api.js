const API_TODOS = 'https://mate-api.herokuapp.com/todos';
const API_USERS = 'https://mate-api.herokuapp.com/users';

export const getTodos = () => (
  fetch(API_TODOS)
    .then(res => res.json())
);

export const getUsers = userId => (
  fetch(`${API_USERS}/${userId}`)
    .then(res => res.json())
);
