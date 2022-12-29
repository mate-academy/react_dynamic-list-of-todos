const BASE_URL = 'https://mate-academy.github.io'
+ '/react_dynamic-list-of-todos/api';

const request = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      return response.json();
    })
    .then(result => result);
};

export const getTodos = () => request('/todos.json');
export const getUsers = () => request('/users.json');
