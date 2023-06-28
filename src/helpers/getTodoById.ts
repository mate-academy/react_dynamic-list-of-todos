import { Todo } from '../types/Todo';

export const getTodoById = (todoId: number, todos: Todo[]) => {
  return todos.find(todo => todo.id === todoId);
};
