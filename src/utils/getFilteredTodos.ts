import { Todo } from '../types/Todo';
import { CompletedFilter } from '../types/CompletedFilter';

interface Props {
  completedFilter: CompletedFilter;
  searchQuery: string;
}

export function getFilteredTodos(
  todos: Todo[],
  { completedFilter, searchQuery }: Props,
) {
  let filteredTodos = [...todos];

  filteredTodos = filteredTodos.filter(({ completed }) => {
    switch (completedFilter) {
      case CompletedFilter.Active:
        return !completed;
      case CompletedFilter.Completed:
        return completed;
      default:
        return true;
    }
  });

  const normalizedTitleFilter = searchQuery.toLocaleLowerCase().trim();

  if (normalizedTitleFilter) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLocaleLowerCase().includes(normalizedTitleFilter),
    );
  }

  return filteredTodos;
}
