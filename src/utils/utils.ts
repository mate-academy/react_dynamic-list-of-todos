import { Todo } from '../types/Todo';

export const debounce = (f: (query: string) => void, delay: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);
    timerId = setTimeout(f, delay, ...args);
  };
};

export const filteringTodos = (
  todosList: Todo[] | null,
  filterQuery: string,
  filtering: string,
) => {
  if (!todosList) {
    return null;
  }

  return todosList.filter(todo => {
    switch (filtering) {
      case 'all':
        return todo.title.toLowerCase().includes(filterQuery.toLowerCase());

      case 'active':
        return !todo.completed
          && todo.title.toLowerCase().includes(filterQuery.toLowerCase());

      case 'completed':
        return todo.completed
          && todo.title.toLowerCase().includes(filterQuery.toLowerCase());

      default:
        return todo;
    }
  });
};
