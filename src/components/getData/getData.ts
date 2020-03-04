const URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const URL_TODOS = 'https://jsonplaceholder.typicode.com/todos';

export const getUsers = (): Promise<User[]> => {
  return fetch(URL_USERS)
    .then(response => response.json());
};

export const getTodos = (): Promise<Todo[]> => {
  return fetch(URL_TODOS)
    .then(response => response.json());
};

export const getData = async (): Promise<TodoWithUser[]> => {
  const users = await getUsers();
  const todos = await getTodos();

  return todos.map((todo: Todo) => {
    return {
      ...todo,
      user: users.find((user: User) => user.id === todo.userId) as User, // as User
    };
  });
};
