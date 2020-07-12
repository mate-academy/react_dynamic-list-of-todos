import { TodoInterface, UserInterface, PreparedTodoInterface } from './interfaces';

const API_USERS = 'https://mate.academy/students-api/users';
const API_TODOS = 'https://mate.academy/students-api/todos';

const fetchData = async (url: string) => {
  const dataObject = await fetch(url).then(response => response.json());

  return dataObject.data;
};

export const getData = async (): Promise<PreparedTodoInterface[]> => {
  const todos: TodoInterface[] = await fetchData(API_TODOS);
  const users: UserInterface[] = await fetchData(API_USERS);

  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) as UserInterface,
  }));
};
