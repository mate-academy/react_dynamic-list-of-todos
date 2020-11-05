const TODOS_URL = 'https://mate-api.herokuapp.com/todos/';
const USERS_URL = 'https://mate-api.herokuapp.com/users/';

export const getAllTodos = () => fetch(TODOS_URL)
  .then(response => response.json())
  .then(todos => todos.data);

export const getUser = id => fetch(`${USERS_URL}${id}`)
  .then(response => response.json())
  .then(user => user.data);
