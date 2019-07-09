
export const loadTodos = async() => {
  const urlTodos = 'https://jsonplaceholder.typicode.com/todos';
  const responseTodos = await fetch(urlTodos);
  const todos = await responseTodos.json();

  return todos;
};

export const loadUsers = async() => {
  const urlUsers = 'https://jsonplaceholder.typicode.com/users';
  const responseUsers = await fetch(urlUsers);
  const users = await responseUsers.json();

  return users;
};
