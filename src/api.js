const API_URL = 'https://mate-api.herokuapp.com/';

async function request(url) {
  const response = await fetch(`${API_URL}${url}`);

  const result = await response.json();

  return result.data;
}

export const getTodos = () => request('todos');
export const getUsers = () => request('users');
