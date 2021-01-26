const BASE_URL = 'https://mate-api.herokuapp.com';

const getAll = (url, options) => (fetch(`${BASE_URL}${url}`, options)
  .then(data => data.json()));

export const getTodos = () => getAll('/todos');

export const getUserById = userId => getAll(`/users/${userId}`);
