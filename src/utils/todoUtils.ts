import { Todo } from '../types/Todo';
import { SelectOptions } from '../components/TodoFilter';

const FILTER_MAP = {
  [SelectOptions.All]: () => true,
  [SelectOptions.Active]: (todo: Todo) => !todo.completed,
  [SelectOptions.Completed]: (todo: Todo) => todo.completed,
};

export function applyFilter(
  todos: Todo[],
  selectedOption: SelectOptions,
  query: string,
): Todo[] {
  return todos
    .filter(FILTER_MAP[selectedOption])
    .filter(todo => todo.title.toLowerCase().includes(query.toLowerCase()));
}
