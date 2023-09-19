import { FilterOptions } from './types/FilterOptions';
import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';

export function filterTodos(
  todos: Todo[],
  { query, filterType }: FilterOptions,
) {
  let todoToRecieve = [...todos].filter(({ completed }) => {
    switch (filterType) {
      case FilterType.Active: {
        return !completed;
      }

      case FilterType.Completed: {
        return completed;
      }

      case FilterType.All:
      default: {
        return true;
      }
    }
  });

  if (query) {
    const normalizedQuery = query.toLowerCase().trim();

    todoToRecieve = todoToRecieve.filter(({ title }) => {
      const normalizedTodoTitle = title.toLowerCase();

      return normalizedTodoTitle.includes(normalizedQuery);
    });
  }

  return todoToRecieve;
}
