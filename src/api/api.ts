const USERS_URL = 'https://jsonplaceholder.typicode.com/users';
const TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';

const getData = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export const getPreparedTodos = async (): Promise<TodoWithUser[]> => {
  const todos: Todo[] = await getData(TODOS_URL);
  const users: User[] = await getData(USERS_URL);

  const preparedTodos = todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) as User,
  }));

  return preparedTodos;
};
