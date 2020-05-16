const API_URL = 'https://seialek.github.io/react_dynamic-list-of-todos/api';
const API_URL_TODOS = `${API_URL}/todos.json`;
const API_URL_USERS = `${API_URL}/users.json`;

export const getData = async () => {
  const [todos, users] = await Promise.all([
    fetch(API_URL_TODOS).then(response => response.json()),
    fetch(API_URL_USERS).then(response => response.json()),
  ]);

  return todos.map((todo: Todo) => ({
    ...todo,
    user: users.find((user: User) => user.id === todo.userId),
  }));
};
