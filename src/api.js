const BASE_URL = 'https://mate-api.herokuapp.com';

function fetchData(baseUrl, path) {
  return fetch(`${baseUrl}/${path}`)
    .then(response => response.json())
    .then(result => result.data);
}

export const getAllTodos = () => fetchData(BASE_URL, 'todos');

export const getUserById = id => fetchData(BASE_URL, `users/${id}`);
