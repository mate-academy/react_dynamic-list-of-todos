const BASE_URL = 'https://mate-api.herokuapp.com';

export const getTodos = () => fetch(`${BASE_URL}/todos`)
  .then(response => response.json())
  .then(serverResponse => serverResponse.data || serverResponse);

export const getUsers = () => fetch(`${BASE_URL}/users`)
  .then(response => response.json())
  .then(serverResponse => serverResponse.data || serverResponse);
