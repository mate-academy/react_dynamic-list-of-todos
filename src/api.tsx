
export const getUsers = async () => {
  const users = fetch('./api/users.json').then(responce => responce.json());

  return users;
};

export const getTodos = async () => {
  const todos = fetch('./api/todos.json').then(responce => responce.json());

  return todos;
};
