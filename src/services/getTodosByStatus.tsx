import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getTodosByStatus = (todos: Todo[], todoStatus: Status) => {
  switch (todoStatus) {
    case 'active':
      return todos.filter(todo => !todo.completed);

    case 'completed':
      return todos.filter(todo => todo.completed);

    case 'all':
    default:
      return todos;
  }
};
