import { Todo } from './types/Todo';
import { Option } from './types/Types';

export const getFilteredTodos = (
  renderedTodos: Todo[],
  query: string,
  selectOption: string,
): Todo[] => {
  let filteredByQuery = renderedTodos.filter(todo => {
    const { title } = todo;
    const preparedQuery = query.trim().toLowerCase();
    const preparedTitle = title.toLowerCase();

    return preparedTitle.includes(preparedQuery);
  });

  switch (selectOption) {
    case Option.Completed:
      filteredByQuery = filteredByQuery.filter(todo => todo.completed);
      break;
    case Option.Active:
      filteredByQuery = filteredByQuery.filter(todo => !todo.completed);
      break;
    default:
      return filteredByQuery;
  }

  return filteredByQuery;
};
