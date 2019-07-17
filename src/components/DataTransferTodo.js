export const getTodos = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos');
  const currentTodos = await response.json();

  return currentTodos;
};

export const getUsers = async() => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const currentUsers = await response.json();

  return currentUsers;
};

