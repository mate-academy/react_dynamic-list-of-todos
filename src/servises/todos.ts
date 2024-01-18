import { ControlParams } from '../types/ControlParams';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function getPreperedTodos(
  todos: Todo[],
  { query, filterBy }: ControlParams,
): Todo[] {
  const preperedTodos = todos.filter(todo => {
    switch (filterBy) {
      case Filter.active:
        return !todo.completed;
      case Filter.completed:
        return todo.completed;
      default:
        return true;
    }
  });

  return preperedTodos.filter(todo => todo.title.includes(query));
}
