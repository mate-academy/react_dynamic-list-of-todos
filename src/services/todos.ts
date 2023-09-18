import { Todo } from '../types/Todo';
import { TodosFilter } from '../types/TodosFilter';

export const getPreparedTodos = (
  todos: Todo[],
  query: string,
  filter: TodosFilter,
) => {
  let preparedTodos = [...todos];

  if (query) {
    preparedTodos = preparedTodos.filter(({ title }) => (
      title.toLowerCase().includes(query.toLowerCase())
    ));
  }

  if (filter !== TodosFilter.All) {
    switch (filter) {
      case TodosFilter.Active:
        return preparedTodos.filter(({ completed }) => !completed);

      case TodosFilter.Completed:
        return preparedTodos.filter(({ completed }) => completed);

      default:
        throw new Error('Invalid data');
    }
  }

  return preparedTodos;
};
