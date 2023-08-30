import { FILTER } from '../types/FILTER';
import { Todo } from '../types/Todo';

export const filterTodos
= (filterBy: FILTER, filterByQuery: string, innerTodos: Todo[]): Todo[] => {
  const copyOfTodos: Todo[] = [...innerTodos];
  let preparedTodos = [...copyOfTodos];

  if (filterBy !== FILTER.ALL) {
    preparedTodos = copyOfTodos.filter(todo => {
      switch (filterBy) {
        case FILTER.ACTIVE:
          return todo.completed === false;
        case FILTER.COMPLETED:
          return todo.completed === true;
        default:
          return true;
      }
    });
  }

  const preparedTodosStage2 = preparedTodos.filter(todo => {
    return todo.title.toLowerCase().includes(filterByQuery.toLowerCase());
  });

  return preparedTodosStage2 as Todo[];
};
