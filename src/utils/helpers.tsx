import { getTodos, getUser } from '../api';
import { Select } from '../types/Select';
import { Todo } from '../types/Todo';
import { User } from '../types/User';

export const filterTodos = (
  select: Select,
  query: string,
  todos: Todo[],
): Todo[] => {
  const lowerAppliedQuery = query.toLowerCase();

  let filteredTodos = todos;

  if (select !== Select.ALL) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (select) {
        case Select.COMPLETED:
          return todo.completed;
        case Select.ACTIVE:
          return !todo.completed;
        default:
          return true;
      }
    });
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(lowerAppliedQuery)));
  }

  return filteredTodos;
};

export const getTodoById = (id: number, todoArr: Todo[]): Todo | null => (
  todoArr.find(todo => todo.id === id) || null
);

export const getUserFromServer = async (
  userId: number,
  userSetter: React.Dispatch<React.SetStateAction<User | null>>,
) => {
  try {
    const userFromServer = await getUser(userId);

    if (userFromServer.name.trim()) {
      userSetter(userFromServer);
    }
  } catch (error) {
    throw Error('Unable to get user from server. Try again later');
  }
};

export const loadingTodos = async (
  todosSetter: React.Dispatch<React.SetStateAction<Todo[]>>,
  loadingSetter: React.Dispatch<React.SetStateAction<boolean>>,
  hasErrorSetter: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    loadingSetter(true);
    const todosFromServer = await getTodos();

    todosSetter(todosFromServer);
  } catch {
    hasErrorSetter(true);
    throw Error('Unable to load todos from server. Try again later');
  } finally {
    loadingSetter(false);
  }
};
