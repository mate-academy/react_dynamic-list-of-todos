import { Todo } from '../types/Todo';
import { SortType } from '../types/Sort';

export const findCurrentTodo = (
  title: string,
  searchValue: string,
): boolean => {
  return title.toLocaleLowerCase()
    .includes(searchValue.toLocaleLowerCase().trim());
};

export const getFilteredTodos = (
  todos: Todo[],
  sortType: string,
  query: string,
) => {
  const visibleTodos = todos
    .filter(({ title }) => findCurrentTodo(title, query));

  return visibleTodos.filter(todo => {
    switch (sortType) {
      case SortType.ACTIVE:
        return !todo.completed;

      case SortType.COMPLETED:
        return todo.completed;

      default:
        return todo;
    }
  });
};
