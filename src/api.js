const BASE__URL = 'https://mate-api.herokuapp.com';

export const request = endPoint => fetch(`${BASE__URL}${endPoint}`)
  .then(response => response.json());

export const getTodos = todos => request(`${todos}`)
  .then(result => result.data.filter(data => data.title));

export const getUser = userId => request(`/users/${userId}`)
  .then(result => result.data);
