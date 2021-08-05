const BASE_URL = `https://mate-api.herokuapp.com/`;

export const request = endpoint => fetch(`${BASE_URL}${endpoint}`)
  .then(response => response.json());

export const getTodos = () => request('todos');

export const getUserByID = userID => request(`users/${userID}`);
