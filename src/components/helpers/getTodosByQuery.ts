import { Todo } from '../../types/Todo';

export const getTodosByQuery = (todos: Todo[], query: string): Todo[] => {
  return todos.filter(todo => todo.title.toLowerCase().includes(query));
};
