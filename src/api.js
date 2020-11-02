const TODO_URL = 'https://mate-api.herokuapp.com/todos';
const USERS_URL = 'https://mate-api.herokuapp.com/users';

// get 30 todos
export const getTodos = () => fetch(TODO_URL)
  .then(respones => respones.json())
  .then(result => result.data.slice(0, 30));

export const getUser = userId => fetch(`${USERS_URL}/${userId}`)
  .then(respones => respones.json())
  .then(result => result.data);
