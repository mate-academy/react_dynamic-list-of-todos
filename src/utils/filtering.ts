import { Todo } from '../types/Todo';

export function filterTodo(todos: Todo[], query: string) {
  return todos.filter(todo => todo.title.toLowerCase().includes(query));
}
