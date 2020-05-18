const API_USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const API_TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';


export const getUsers = () => {
  return fetch(API_USERS_URL)
    .then(response => response.json());
};

export const getTodos = () => {
  return fetch(API_TODOS_URL)
    .then(response => response.json());
};

export const getPreparedTodos = async () => {
  const [todos, users] = await Promise.all([getTodos(), getUsers()]);
  const preparedTodos = todos.map((todo: Todo) => ({
    ...todo,
    user: users.find((user: User) => user.id === todo.userId),
  }));

  return preparedTodos;
};
