const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users';

export const getTodos = () => fetch(TODOS_URL)
  .then(responce => responce.json())
  .then(todos => todos.data);

export const getUser = userId => fetch(`${USERS_URL}/${userId}`)
  .then(responce => responce.json())
  .then(users => users.data);
