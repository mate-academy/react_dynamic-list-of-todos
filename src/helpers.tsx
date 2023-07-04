import { Todo } from './types/Todo';
import { FilterBy } from './types/FilterBy';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  filter: FilterBy,
) => {
  const normalizedQuery = query.toLowerCase().trim();

  return todos.filter(todo => {
    const normalizedTitle = todo.title.toLowerCase();
    const foundedTodo = normalizedTitle.includes(normalizedQuery);

    switch (filter) {
      case FilterBy.Active:
        return !todo.completed && foundedTodo;

      case FilterBy.Completed:
        return todo.completed && foundedTodo;

      case FilterBy.All:
        return foundedTodo;

      default:
        return foundedTodo;
    }
  });
};
