const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTodos = async() => {
  const response = await fetch(`${API_URL}/todos`);
  const todosFromServer = await response.json();
  return todosFromServer;
};

export const getUsers = async() => {
  const response = await fetch(`${API_URL}/users`);
  const usersFromServer = await response.json();
  return usersFromServer;
};
