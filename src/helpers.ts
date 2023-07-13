import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

export const filterTodos = (
  todos: Todo[],
  filter: Filter,
  query: string,
) => {
  return todos.filter(todo => {
    const titleMatchesQuery = todo.title
      .toLowerCase()
      .includes(query.toLowerCase().trim());

    switch (filter) {
      case 'completed':
        return todo.completed && titleMatchesQuery;
      case 'active':
        return !todo.completed && titleMatchesQuery;
      default:
        return titleMatchesQuery;
    }
  });
};
