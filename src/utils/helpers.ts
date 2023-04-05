import { Todo } from '../types/Todo';
import { ACTIVE, COMPLETED } from './constants';

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
    switch (true) {
      case sortType === ACTIVE:
        return !todo.completed;

      case sortType === COMPLETED:
        return todo.completed;

      default:
        return todo;
    }
  });
};
