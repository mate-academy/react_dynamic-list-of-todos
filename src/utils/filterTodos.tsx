import { Todo } from '../types/Todo';

export enum FilterBy {
  Active = 'active',
  Completed = 'completed',
  All = 'all',
}
export const filterTodo = (
  todos: Todo[],
  filterBy: FilterBy,
  query: string,
) => {
  let visibleTodo = [...todos];

  visibleTodo = visibleTodo.filter(todo => {
    switch (filterBy) {
      case FilterBy.Active:
        return !todo.completed;
      case FilterBy.Completed:
        return todo.completed;
      case FilterBy.All:
        return visibleTodo;
      default:
        throw new Error('not valide filter argument');
    }
  });

  const normalizeQuery = query.toLowerCase().trim();

  if (query) {
    visibleTodo = visibleTodo.filter(todo => {
      return todo
        .title
        .toLowerCase()
        .includes(normalizeQuery);
    });
  }

  return visibleTodo;
};
