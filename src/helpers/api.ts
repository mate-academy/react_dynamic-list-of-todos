export const getUsers = () => {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json());
};

export const getTodos = () => {
  return fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json());
};

export const getPrepareTodos = async () => {
  const [todos, users] = await Promise.all([getTodos(), getUsers()]);
  const prepareTodos = todos.map((todo: Todos) => ({
    ...todo,
    user: { ...users.find((user: Users) => user.id === todo.userId) },
  }));

  return prepareTodos;
};
