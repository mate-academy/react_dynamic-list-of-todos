const TODOS_URL = 'https://mate.academy/students-api/todos';
const USERS_URL = 'https://mate.academy/students-api/users';

export const getPreparedTodos = async (): Promise<Todo[]> => {
  const todos = await fetch(TODOS_URL).then(response => response.json()).then(({ data }) => data);
  const users = await fetch(USERS_URL).then(response => response.json()).then(({ data }) => data);

  return (todos.map((todo: Todo) => ({
    ...todo,
    user: users.find((user: User) => user.id === todo.userId),
  })));
};
