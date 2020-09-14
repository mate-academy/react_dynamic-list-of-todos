const TODOS_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users/';

export const getTodos = () => fetch(TODOS_URL)
  .then(response => response.json())
  .then(result => result.data);

export const getSelectedUser = userId => fetch(`${USERS_URL}${userId}`)
  .then(response => response.json())
  .then(result => result.data);
