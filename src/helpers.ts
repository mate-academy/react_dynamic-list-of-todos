import { FilterOptions } from './types/FilterOptions';
import { Todo } from './types/Todo';

export function filterTodos(
  todos: Todo[],
  { query, filterType }: FilterOptions,
) {
  let todoToRecieve = [...todos];

  if (filterType !== 'all') {
    const isCompleted = filterType === 'completed';

    todoToRecieve = todoToRecieve.filter(
      ({ completed }) => completed === isCompleted,
    );
  }

  if (query) {
    const normalizedQuery = query.toLowerCase();

    todoToRecieve = todoToRecieve.filter(({ title }) => {
      const normalizedTodoTitle = title.toLowerCase();

      return normalizedTodoTitle.includes(normalizedQuery);
    });
  }

  return todoToRecieve;
}
