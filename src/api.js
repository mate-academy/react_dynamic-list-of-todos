const url = 'https://mate-api.herokuapp.com';

export const getTodos = () => fetch(`${url}/todos`)
  .then(response => response.json())
  .then(todos => todos.data);

export const getUser = userId => fetch(`${url}/users/${userId}`)
  .then(response => response.json())
  .then(user => user.data);
