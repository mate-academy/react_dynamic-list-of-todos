const BASE_URL = 'https://mate-api.herokuapp.com';

export const todosPromis = () => fetch(`${BASE_URL}/todos`)
  .then(response => response.json())
  .then(result => result.data);

export const userFromServer = userId => fetch(`${BASE_URL}/users/${userId}`)
  .then(response => response.json())
  .then(result => result.data);
