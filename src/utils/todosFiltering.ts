import { Todo } from '../types/Todo';

export const filteringBySelect = (todos: Todo[], value: string) => {
  return todos.filter(todo => {
    switch (value) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return true;
    }
  });
};

export const filteringBySearch = (todos: Todo[], value: string) => {
  if (!value.trim().length) {
    return todos;
  }

  return todos.filter((todo) => {
    return todo.title.toLowerCase().includes(value.toLowerCase());
  });
};
