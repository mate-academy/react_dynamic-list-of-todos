import { GroupStatusTypes } from '../types/TextField';
import { Todo } from '../types/Todo';

export function getFilteredTodos(
  todos: Todo[],
  textInput: string,
  filteredStatus: GroupStatusTypes,
): Todo[] {
  const filteredTodos = [...todos];

  let result = filteredTodos;

  if (textInput) {
    const normalizedQuery = textInput.trim().toLocaleLowerCase();

    result = result.filter(todo =>
      todo.title.toLocaleLowerCase().includes(normalizedQuery),
    );
  }

  if (filteredStatus) {
    switch (filteredStatus) {
      case GroupStatusTypes.ACTIVE:
        result = result.filter(todo => !todo.completed);
        break;

      case GroupStatusTypes.COMPLETED:
        result = result.filter(todo => todo.completed);
        break;

      default:
        break;
    }
  }

  return result;
}
