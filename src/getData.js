export const getTodos = async() => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const response = await fetch(url);
  const todos = await response.json();
  return todos;
};

export const getUsers = async() => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await fetch(url);
  const users = await response.json();

  return users;
};
