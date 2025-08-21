import { Todo } from '../types/Todo';

export function filterTodosByStatus(arr: Todo[], status: string) {
  return arr.filter(todo => {
    switch (status) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });
}
