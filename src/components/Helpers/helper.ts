import { Todo } from '../../types/Todo';
import { Select } from '../../types/Select';

export const filterTodos = (
  todosFromAPI: Todo[],
  query: string,
  status: Select,
): Todo[] => {
  let todosToProceed = [...todosFromAPI];

  if (query) {
    todosToProceed = todosToProceed.filter(
      (todo) => todo.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
  }

  if (status) {
    switch (status) {
      case Select.ACTIVE: {
        todosToProceed = todosToProceed.filter((todo) => !todo.completed);
        break;
      }

      case Select.COMPLETED: {
        todosToProceed = todosToProceed.filter((todo) => todo.completed);
        break;
      }

      default: {
        return todosToProceed;
      }
    }
  }

  return todosToProceed;
};
