import { Filters } from './types/Filters';
import { Todo } from './types/Todo';

type Arguments = {
  todos: Todo[];
  query: string;
  filter: string;
};

export const prepareTodos = ({
  todos,
  query,
  filter,
}: Arguments): Todo[] => {
  let filteredTodos = todos;

  if (query) {
    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase().trim())
    ));
  }

  if (filter) {
    switch (filter) {
      case Filters.completed:
        return filteredTodos.filter(todo => todo.completed);

      case Filters.active:
        return filteredTodos.filter(todo => !todo.completed);

      default:
        return filteredTodos;
    }
  }

  return filteredTodos;
};
