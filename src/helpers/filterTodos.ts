/* eslint-disable max-len */
import { Todo } from '../types/Todo';
import { FILTER } from '../types/filterEnum';

type Args = {
  searchField: string;
  filterField: FILTER;
};

export const filterTodo = (
  todos: Todo[],
  { searchField, filterField }: Args,
): Todo[] => {
  let todoCopy = [...todos];

  if (searchField) {
    const lowerSearch = searchField.toLowerCase().trim();

    todoCopy = todoCopy.filter((todo) => todo.title.toLowerCase().includes(lowerSearch));
  }

  if (filterField) {
    todoCopy = todoCopy.filter((todo) => {
      switch (filterField) {
        case FILTER.ACTIVE:
          return !todo.completed;
        case FILTER.COMPLETED:
          return todo.completed;
        default:
          return todo;
      }
    });
  }

  return todoCopy;
};
