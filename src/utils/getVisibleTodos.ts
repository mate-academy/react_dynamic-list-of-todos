import { Todo } from '../types/Todo';

export function getVisibleTodos(todos: Todo[], filter: string, query: string) {
  return todos.filter(todo => {
    const querySearch = todo.title
      .toLocaleLowerCase()
      .includes(query.toLocaleLowerCase());

    if (!querySearch) {
      return false;
    }

    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });
}
