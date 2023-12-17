import { Todo } from '../../types/Todo';

export const setRequestedTodos = (todos: Todo [], query: string) => {
  if (query) {
    return todos.filter(({ title }) => title
      .toLowerCase()
      .includes(query.toLowerCase()));
  }

  return [...todos];
};
