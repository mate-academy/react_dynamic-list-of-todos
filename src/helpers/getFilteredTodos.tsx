import { Filters, Todo } from '../types';

export function getFilteredTodos(
  category: Filters,
  query: string,
  todoItems: Todo[],
) {
  let preparedItems: Todo[] = todoItems;

  if (category !== Filters.All) {
    preparedItems = preparedItems
      .filter(({ completed }) => {
        switch (category) {
          case Filters.Active:
            return !completed;
          case Filters.Completed:
            return completed;
          default:
            return Filters.All;
        }
      });
  }

  if (query) {
    const preparedQuery = query.trim().toLowerCase();

    preparedItems = preparedItems
      .filter(({ title }) => title.toLowerCase()
        .includes(preparedQuery));
  }

  return preparedItems;
}
