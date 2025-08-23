import { FilterTypes, Todo } from '../types/Todo';

export function preparedTodos(data: Todo[], filter: FilterTypes, text: string) {
  switch (filter) {
    case FilterTypes.Active: {
      return data.filter(
        todo =>
          !todo.completed &&
          todo.title.toLowerCase().includes(text.toLowerCase()),
      );
    }

    case FilterTypes.Completed: {
      return data.filter(
        todo =>
          todo.completed &&
          todo.title.toLowerCase().includes(text.toLowerCase()),
      );
    }

    case FilterTypes.All:
    default:
      return data.filter(todo =>
        todo.title.toLowerCase().includes(text.toLowerCase()),
      );
  }
}
