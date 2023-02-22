import { FilterType } from '../../types/Filter';
import { Todo } from '../../types/Todo';

export const getVisibleTodos = (todos: Todo[], type: string, query: string) => {
  let preparedTodos = [...todos];

  if (query) {
    const lowerQuery = query.toLowerCase();

    preparedTodos = preparedTodos
      .filter(todo => todo.title.toLowerCase().includes(lowerQuery));
  }

  preparedTodos = preparedTodos.filter(todo => {
    switch (type) {
      case FilterType.All:
        return true;
      case FilterType.Active:
        return !todo.completed;
      case FilterType.Completed:
        return todo.completed;
      default:
        throw new Error('Filter type is incorrect');
    }
  });

  return preparedTodos;
};
