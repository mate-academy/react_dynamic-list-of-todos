import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

export function filterTodos(todos: Todo[], filterType: Filter, query: string) {
  let todosCopy = [...todos];

  if (query.trim()) {
    todosCopy = todosCopy.filter(todo => todo.title
      .toLowerCase()
      .includes(query.toLowerCase()));
  }

  switch (filterType) {
    case Filter.Active:
      return todosCopy.filter(todo => !todo.completed);

    case Filter.Completed:
      return todosCopy.filter(todo => todo.completed);

    default:
      return todosCopy;
  }
}
