import { ETodoStatus, Todo } from '../types/Todo';

interface ITodosQuery {
  inputField?: string;
  filteredBy?: ETodoStatus;
}

export function getPreparedTodos(todos: Todo[], {
  inputField = '',
  filteredBy = ETodoStatus.All,
}: ITodosQuery) {
  let preparedTodos = [...todos];

  if (inputField) {
    const searchQueryLowerCase = inputField.toLowerCase().trim();

    preparedTodos = preparedTodos.filter(({ title }) => (
      title.toLowerCase().includes(searchQueryLowerCase)
    ));
  }

  if (filteredBy !== ETodoStatus.All) {
    switch (filteredBy) {
      case ETodoStatus.Active:
        return preparedTodos.filter(({ completed }) => !completed);

      case ETodoStatus.Completed:
        return preparedTodos.filter(({ completed }) => completed);

      default:
        throw new Error('Invalid status selected.');
    }
  }

  return preparedTodos;
}
