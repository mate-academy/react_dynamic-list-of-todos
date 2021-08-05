const BASE_URL = 'https://mate-api.herokuapp.com';

export const loadData = url => fetch(`${BASE_URL}${url}`)
  .then(response => response.json())
  .then(serverResponse => serverResponse.data || serverResponse);

export const loadTodos = () => loadData('/todos');

export const loadUser = user => loadData(`/users/${user}/`);
