import { Todo } from '../types/Todo';

export function findTodoById(id: number, todos: Todo[]) {
  return todos.find(todo => todo.id === id) || null;
}
