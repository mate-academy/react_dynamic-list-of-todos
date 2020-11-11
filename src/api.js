const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users';

export const allTodos = () => fetch(TODOS_URL)
  .then(response => response.json())
  .then(todo => todo.data);

export const getUser = userId => fetch(`${USERS_URL}/${userId}`)
  .then(response => response.json())
  .then(todo => todo.data);
