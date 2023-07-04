import { Todo } from './types/Todo';

export enum FilterStatus {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export const filterTodos = (
  todos: Todo[],
  query: string,
  filterCondition: FilterStatus,
) => {
  return todos.filter(todo => {
    const preparedQUery = query.toLowerCase();
    const queriedTodo = todo.title.toLowerCase().includes(preparedQUery);

    switch (filterCondition) {
      case FilterStatus.ALL:
        return queriedTodo;
      case FilterStatus.ACTIVE:
        return queriedTodo && !todo.completed;
      case FilterStatus.COMPLETED:
        return queriedTodo && todo.completed;
      default:
        return 0;
    }
  });
};
