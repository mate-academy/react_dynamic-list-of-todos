import { Filter } from './App';
import { Todo } from './types/Todo';

export function getFilteredTodos(todos: Todo[], filter: Filter) {
  return todos.filter(todo => {
    const lowerCaseTitle = todo.title.toLowerCase();

    switch (filter.status) {
      case 'all':
        return lowerCaseTitle.includes(filter.title.toLowerCase());

      case 'active':
        return (
          !todo.completed && lowerCaseTitle.includes(filter.title.toLowerCase())
        );

      case 'completed':
        return (
          todo.completed && lowerCaseTitle.includes(filter.title.toLowerCase())
        );

      default:
        return false;
    }
  });
}
