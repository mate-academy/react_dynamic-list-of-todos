const API_TODOS = `https://mate-api.herokuapp.com/todos`;
const USERS = `https://mate-api.herokuapp.com/users/`;

export const getTodos = () => fetch(API_TODOS)
  .then(response => response.json())
  .then(result => result.data);

export const getUser = userId => fetch(`${USERS}${userId}`)
  .then(response => response.json())
  .then(result => result.data);
