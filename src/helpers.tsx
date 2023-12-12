import { Todo } from './types/Todo';

export const getfilteredTodos = (
  renderedTodos: Todo[],
  query: string,
  selectValue: string,
): Todo[] => {
  let filteredByQuery = renderedTodos.filter(todo => {
    const { title } = todo;
    const preparedQuery = query.trim().toLowerCase();
    const preparedTirle = title.toLowerCase();

    return preparedTirle.includes(preparedQuery);
  });

  switch (selectValue) {
    case 'completed':
      filteredByQuery = filteredByQuery.filter(todo => todo.completed);
      break;
    case 'active':
      filteredByQuery = filteredByQuery.filter(todo => !todo.completed);
      break;
    default:
      return filteredByQuery;
  }

  return filteredByQuery;
};
