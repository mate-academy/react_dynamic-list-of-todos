import { Todo } from '../types/Todo';

export function getTodoById(todos: Todo[], todoId: number): Todo {
  return todos.find(todo => todo.id === todoId) as Todo;
}
