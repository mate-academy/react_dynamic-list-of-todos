const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTodos = async() => {
  // return todos;
  const response = await fetch(`${API_URL}/todos`);
  const todos = await response.json();

  return todos;
};

export const getUsers = async() => {
  // return users;
  const response = await fetch(`${API_URL}/users`);
  const users = await response.json();

  return users;
};
