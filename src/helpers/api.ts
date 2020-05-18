const API_URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const API_URL_TODOS = 'https://jsonplaceholder.typicode.com/todos';

export const getUsers = () => {
  return fetch(API_URL_USERS)
    .then(response => response.json());
};

export const getTodos = () => {
  return fetch(API_URL_TODOS)
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
