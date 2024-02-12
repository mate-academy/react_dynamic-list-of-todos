import { FilterType } from './variables';
import { Todo } from '../types/Todo';

export const getFilterTodo = (
  query: string,
  filterBy: string,
  todos: Todo[],
) => {
  if (filterBy === FilterType.All && !query) {
    return todos;
  }

  const preparedTodos = todos.filter(todo => {
    return todo.title
      .toLowerCase()
      .includes(query.toLowerCase());
  });

  return preparedTodos.filter(todo => {
    switch (filterBy) {
      case FilterType.Active: {
        return !todo.completed;
      }

      case FilterType.Completed: {
        return todo.completed;
      }

      default: {
        return todo;
      }
    }
  });
};
