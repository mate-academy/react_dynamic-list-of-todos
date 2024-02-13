import { FilterBy } from '../enums/FilterBy';
import { Todo } from '../types/Todo';

export function handleTodoFilter(
  todoFromServer: Todo[],
  filterBy: string,
  title = '',
): Todo[] {
  const filteredTodo = todoFromServer
    .filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()));

  switch (filterBy) {
    case FilterBy.Active:
      return filteredTodo.filter(todo => !todo.completed);

    case FilterBy.Completed:
      return filteredTodo.filter(todo => todo.completed);

    default:
      return filteredTodo;
  }
}
