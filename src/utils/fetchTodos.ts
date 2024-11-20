import { getTodos, getUser } from '../api';
import { Todo } from '../types/Todo';

export const fetchTodos = async () => {
  const todoData: Todo[] = await getTodos();

  const todos = await Promise.all(
    todoData.map(async todo => {
      const user = await getUser(todo.userId);

      return {
        ...todo,
        user,
      };
    }),
  );

  return todos;
};
