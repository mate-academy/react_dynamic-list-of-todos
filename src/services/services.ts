import { LOADING_TIME, FilterType } from './variables';
import { Todo } from '../types/Todo';

export const showLoader = (callback: (v: boolean) => void) => {
  setTimeout(() => callback(false), LOADING_TIME);
};

export const handleFilterTodo = (
  query: string,
  filterBy: string,
  todos: Todo[],
) => {
  if (filterBy === FilterType.All
    && query === '') {
    return todos;
  }

  const preparedGoods = todos.filter(todo => {
    return todo.title
      .toLowerCase()
      .includes(query.toLowerCase());
  });

  return preparedGoods.filter(todo => {
    switch (filterBy) {
      case FilterType.Active: {
        return todo.completed === false;
      }

      case FilterType.Completed: {
        return todo.completed === true;
      }

      default: {
        return todo;
      }
    }
  });
};
