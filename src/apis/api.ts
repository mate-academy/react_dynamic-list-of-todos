const TODOS_API = 'https://mate.academy/students-api/todos';
const USERS_API = 'https://mate.academy/students-api/users';

export const getAllTodos = () => (
  fetch(TODOS_API)
    .then(response => response.json())
);

export const getAllUsers = () => (
  fetch(USERS_API)
    .then(response => response.json)
);
