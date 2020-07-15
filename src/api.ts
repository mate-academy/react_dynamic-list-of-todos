import { User, Todo, TodosWithUsers } from './interfaces';

const API_URL = 'https://mate.academy/students-api/';

const getData = async <T>(url: string): Promise<T> => {
  const dataFromServer = await fetch(url).then(response => response.json());

  return dataFromServer.data;
};

const getTodos = (): Promise<Todo[]> => {
  return getData<Todo[]>(`${API_URL}todos`);
};

const getUsers = (): Promise<User[]> => {
  return getData<User[]>(`${API_URL}users`);
};

export const getPreparedTodos = async (): Promise<TodosWithUsers[]> => {
  const todos: Todo[] = await getTodos();
  const users: User[] = await getUsers();
  const todosWithUsers: TodosWithUsers[] = todos.map(todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId) as User,
  }));

  return todosWithUsers;
};
