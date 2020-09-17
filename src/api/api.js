const MAIN_URL = 'https://mate-api.herokuapp.com';

export const getTodos = () => fetch(`${MAIN_URL}/todos`)
  .then(responce => responce.json())
  .then(todos => todos.data);

export const getUser = userId => fetch(`${MAIN_URL}/users/${userId}`)
  .then(responce => responce.json())
  .then(users => users.data);
