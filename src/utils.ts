import { Completion } from './types/Completion';
import { Todo } from './types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  completionFilter: Completion,
) => {
  let filteredTodos = [...todos];

  if (query) {
    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase().trim())
    ));
  }

  if (completionFilter !== Completion.All) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (completionFilter) {
        case Completion.Completed:
          return todo.completed;

        case Completion.Active:
          return !todo.completed;

        default:
          return true;
      }
    });
  }

  return filteredTodos;
};
