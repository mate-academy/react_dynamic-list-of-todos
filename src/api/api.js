const API_TODOS = `https://mate-api.herokuapp.com/todos`;
// const USERS = `https://mate-api.herokuapp.com/users/`;

export const getTodos = () => fetch(API_TODOS)
  .then(response => response.json());

// eslint-disable-next-line max-len
export const getUser = userId => fetch(`https://mate-api.herokuapp.com/users/${userId}`)
  .then(response => response.json());
