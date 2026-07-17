import { Todo } from '../../types/Todo';

import { TodoFilterType } from '../../types/TodoFilter';

import { todoFilterPredicates } from './todoFilterPredicates';

export function filterTodos(
  todos: Todo[],
  todoFilter: TodoFilterType,
  query: string,
) {
  const normalizedQuery = query.trim().toLowerCase();

  return todos.filter(todo => {
    const matchesStatus = todoFilterPredicates[todoFilter](todo);

    const matchesQuery = todo.title.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesQuery;
  });
}
