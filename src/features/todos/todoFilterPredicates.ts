import { Todo } from '../../types/Todo';
import { TodoFilter, TodoFilterType } from '../../types/TodoFilter';

type TodoPredicate = (todo: Todo) => boolean;

export const todoFilterPredicates: Record<TodoFilterType, TodoPredicate> = {
  [TodoFilter.All]: () => true,

  [TodoFilter.Active]: todo => !todo.completed,

  [TodoFilter.Completed]: todo => todo.completed,
};
