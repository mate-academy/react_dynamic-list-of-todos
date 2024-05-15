import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  filteredStatus: string,
  searchQuery: string,
) => {
  return todos
    .filter(todo => {
      if (filteredStatus === 'completed') {
        return todo.completed;
      }

      if (filteredStatus === 'active') {
        return !todo.completed;
      }

      return true;
    })
    .filter(todo =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase().trimStart()),
    );
};
