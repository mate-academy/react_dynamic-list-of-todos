export const getTodos = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const todos = await response.json();

  return todos;
};

export const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();

  return users;
};
