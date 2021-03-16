const url = 'https://mate-api.herokuapp.com/';

export const todosFromServer = () => fetch(`${url}todos`)
  .then(response => response.json())
  .then(result => result.data);

export const usersFromServer = () => fetch(`${url}users`)
  .then(response => response.json())
  .then(result => result.data);
