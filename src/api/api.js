/* eslint-disable no-multiple-empty-lines */
const TODO_API_URL = 'https://mate-api.herokuapp.com';

const request = (url, options) => fetch(`${TODO_API_URL}${url}`, options)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} - ${response.statusText}`);
  })
  .then(result => result.data);

export const getTodos = () => request('/todos');
export const getUsers = () => request('/users');
export const getUser = selectedUserId => request(`/users/${selectedUserId}`);
