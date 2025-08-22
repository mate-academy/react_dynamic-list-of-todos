import { Todo } from '../types/Todo';
export enum Filters {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export function prepareTodos(data: Todo[], filter: Filters, text: string) {
  switch (filter) {
    case Filters.Active: {
      return data.filter(
        todo =>
          !todo.completed &&
          todo.title.toLowerCase().includes(text.toLowerCase()),
      );
    }

    case Filters.Completed: {
      return data.filter(
        todo =>
          todo.completed &&
          todo.title.toLowerCase().includes(text.toLowerCase()),
      );
    }

    case Filters.All:
    default:
      return data.filter(todo =>
        todo.title.toLowerCase().includes(text.toLowerCase()),
      );
  }
}
