import { Todo } from '../types/Todo';

export const selectedOption = (value: string, todo: Todo) => {
  switch (value) {
    case 'all':
      return todo;

    case 'active':
      return todo.completed === false;

    case 'completed':
      return todo.completed === true;

    default:
      break;
  }

  return value;
};
