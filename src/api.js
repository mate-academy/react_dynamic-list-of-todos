const TODO_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users';

export const getTodos = () => fetch(TODO_URL)
  .then(response => response.json())
  .then(result => result.data);

export const getUser = userId => fetch(`${USERS_URL}/${userId}`)
  .then(response => response.json())
  .then(result => result.data);
