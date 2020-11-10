const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users';

export const getTodos = () => fetch(TODOS_URL)
  .then(response => response.json())
  .then(todo => todo.data);

export const getUsers = userId => fetch(`${USERS_URL}/${userId}`)
  .then(response => response.json())
  .then(todo => todo.data);
