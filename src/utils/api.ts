import { USERS_URL, TODOS_URL } from './constants';


export const getData = async <T>(url: string): Promise<T> => {
  return fetch(url)
    .then(response => response.json());
};

export const getUsers = async (): Promise<User[]> => {
  return getData<User[]>(USERS_URL);
};

export const getTodos = async (): Promise<Todo[]> => {
  return getData<Todo[]>(TODOS_URL);
};

export const getCorrectTodos = async (): Promise<PreparedTodo[]> => {
  const todos: Todo[] = await getTodos();
  const users: User[] = await getUsers();

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
};
