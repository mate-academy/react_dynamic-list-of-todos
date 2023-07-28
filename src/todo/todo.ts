import { FilterBy, Todo } from '../types/Todo';

export function filterGoods(
  todos: Todo[],
  filterBy: FilterBy,
  query: string,
) {
  let copyTodos = [...todos];
  const normalizedQuery = query.toLowerCase().trim();

  if (normalizedQuery) {
    copyTodos = copyTodos.filter(todo => {
      const normalizedTitle = todo.title.toLowerCase().trim();

      return normalizedTitle.includes(normalizedQuery);
    });
  }

  switch (filterBy) {
    case FilterBy.ALL:
      return copyTodos;

    case FilterBy.COMPLETED:
      return copyTodos.filter(todo => todo.completed);

    case FilterBy.ACTIVE:
      return copyTodos.filter(todo => !todo.completed);

    default:
      return copyTodos;
  }
}
