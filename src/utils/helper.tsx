import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export const prepareTodo = (
  todos: Todo[],
  searchQuery: string,
  status: string,
) => {
  let preparedTodos = todos.filter(todo => {
    switch (status) {
      case Filter.ACTIVE:
        return !todo.completed;
      case Filter.COMPLETED:
        return todo.completed;
      default:
        return true;
    }
  });

  if (searchQuery) {
    preparedTodos = preparedTodos.filter(todo => {
      const preparedQuery = searchQuery.toLowerCase();
      const preparedTitle = todo.title.toLowerCase();

      return preparedTitle.includes(preparedQuery);
    });
  }

  return preparedTodos;
};
