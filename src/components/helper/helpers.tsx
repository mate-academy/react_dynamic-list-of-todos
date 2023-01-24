import { Todo } from '../../types/Todo';

export const getTodosFilteredByCompletedAndIncludesQuery = (
  todos: Todo[],
  filterByCompleted: string,
  query: string,
) => {
  return todos.filter((todo: Todo) => {
    const queryLowerCase = query.toLocaleLowerCase().trim();

    const filterByTitle = todo.title.toLocaleLowerCase()
      .includes(queryLowerCase);

    switch (filterByCompleted) {
      case 'active':
        return !todo.completed && filterByTitle;

      case 'completed':
        return todo.completed && filterByTitle;

      default:
        return todo && filterByTitle;
    }
  });
};
