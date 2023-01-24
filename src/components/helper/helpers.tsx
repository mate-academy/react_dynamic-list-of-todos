import { Todo } from '../../types/Todo';

export const getTodosIncludesQuery = (todos: Todo[], query: string) => {
  const queryLowerCase = query.toLocaleLowerCase().trim();

  return todos
    .filter((todo) => todo.title.toLocaleLowerCase().includes(queryLowerCase));
};

export const getTodosFilteredByCompleted = (
  todos: Todo[],
  filterByCompleted: string,
) => {
  return todos.filter((todo: Todo) => {
    switch (filterByCompleted) {
      case 'active':
        return !todo.completed;

      case 'completed':
        return todo.completed;

      default:
        return true;
    }
  });
};
