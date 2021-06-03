const BASE_URL = 'https://mate-api.herokuapp.com';
const urlTodos = '/todos';

const request = (baseUrl, url) => fetch(`${baseUrl}${url}`)
  .then(response => response.json());

export const getTodos = () => request(BASE_URL, urlTodos);

export const getUser = (userId) => {
  const userIdUlr = `/users/${userId}`;

  return request(BASE_URL, userIdUlr);
};
