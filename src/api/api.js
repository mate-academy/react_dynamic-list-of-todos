const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users';

export const getTodos = () => fetch(TODOS_URL)
  .then(todos => todos.json())
  .then(todos => todos.data);

export const getUser = userId => fetch(`${USERS_URL}/${userId}`)
  .then(user => user.json())
  .then(user => user.data);
