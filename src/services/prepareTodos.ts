import { FilterField } from '../types/FilterField';
import { Todo } from '../types/Todo';

export function prepareTodos(todos: Todo[], filterField: FilterField) {
  const { status, title } = filterField;
  const filteredByTitle = todos
    .filter(todo => todo.title.toLowerCase().includes(title));

  switch (status) {
    case 'active':
      return filteredByTitle.filter(({ completed }) => !completed);
    case 'completed':
      return filteredByTitle.filter(({ completed }) => completed);
    default:
      return filteredByTitle;
  }
}
