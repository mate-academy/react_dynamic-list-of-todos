import { getTodos } from '../api';
import type { Todo } from '../types/Todo';

export const getTodo = (todoId: number): Promise<Todo | undefined> => {
  return getTodos().then(todosFromServer =>
    todosFromServer.find(todo => todo.id === todoId),
  );
};
