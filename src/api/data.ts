import { Todo, User } from '../interfaces/interfaces';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTodos = () => {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
};

export const getUsers = () => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json());
};

export const getPreparedData = async () => {
  const todosData = await getTodos();
  const usersData = await getUsers();
  const preparedTodos = todosData.map((todo: Todo) => ({
    ...todo,
    user: usersData.find((user: User) => user.id === todo.userId),
  }));

  return preparedTodos;
};
