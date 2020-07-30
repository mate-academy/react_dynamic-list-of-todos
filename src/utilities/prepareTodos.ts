import { Todo, User, PreparedTodo } from '../interfaces';
import { usersUrl, todosURL, getData } from '../API/api';
import { noUser } from './constants';

export const prepareTodos = (todos: Todo[], users: User[]): PreparedTodo[] => {
  return todos.map(todo => {
    const matchedUser = users.find(user => user.id === todo.userId) || noUser;

    return {
      todo,
      user: { ...matchedUser },
    };
  });
};

export const makeTodoList = async (): Promise<PreparedTodo[]> => {
  const users = await getData<User>(usersUrl);
  const todos = await getData<Todo>(todosURL);

  return prepareTodos(todos, users);
};
