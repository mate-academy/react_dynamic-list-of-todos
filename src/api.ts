
const BASE_URL = 'https://jsonplaceholder.typicode.com';

const getTodos = () => {
  return fetch(`${BASE_URL}/todos`)
    .then(todos => todos.json());
};

const getUsers = () => {
  return fetch(`${BASE_URL}/users`)
    .then(users => users.json());
};

export const getPreparedTodos = async () => {
  const [todos, users] = await Promise.all([getTodos(), getUsers()]);

  return todos.map((todo: TodoFromServer) => {
    return {
      ...todo,
      user: users.find((user: UserFromServer) => user.id === todo.userId),
    };
  });
};
