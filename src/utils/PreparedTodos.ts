import { Todo } from '../types/Todo';
import { TodosFilter } from '../types/TodoFilter';

export const getpreparedTodos = (
  todos: Todo[],
  query: string,
  filter: TodosFilter,
) => {
  let preparedTodos = [...todos];

  if (query) {
    preparedTodos = preparedTodos
      .filter(({ title }) => title.toLowerCase().includes(query.toLowerCase()));
  }

  if (filter !== TodosFilter.All) {
    switch (filter) {
      case TodosFilter.Active:
        preparedTodos = preparedTodos.filter((todo) => !todo.completed);
        break;
      case TodosFilter.Completed:
        preparedTodos = preparedTodos.filter((todo) => todo.completed);
        break;
      default:
        break;
    }
  }

  return preparedTodos;
};
