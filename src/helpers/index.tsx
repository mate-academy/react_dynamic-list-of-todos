import { Todo } from '../types/Todo';

export function filterByTitle(todos: Todo[], title: string) {
  return todos.filter(todo => todo.title.toLocaleUpperCase()
    .includes(title.toLocaleUpperCase()));
}

export function filterByTodoStatus(todos: Todo[], sortBy: string) {
  return todos.filter(todo => {
    switch (sortBy) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  });
}
