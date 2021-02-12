const TODO_API_URL = 'https://mate-api.herokuapp.com';

const request = url => fetch(`${TODO_API_URL}${url}`)
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
