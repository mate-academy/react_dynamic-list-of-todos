const API_URL = `https://mate-api.herokuapp.com/todos`;
const BaseURL = `https://mate-api.herokuapp.com/users/`;

export const getTodos = () => fetch(API_URL)
  .then(response => response.json())
  .then(result => result.data);

export const getUser = url => fetch(`${BaseURL}${url}`)
  .then(response => response.json())
  .then(result => result.data);
