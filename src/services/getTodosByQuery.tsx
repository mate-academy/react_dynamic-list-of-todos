import { Todo } from '../types/Todo';

export const getTodosByQuery = (todos: Todo[], query: string) => {
  return query
    ? todos.filter(todo => todo.title.toLocaleLowerCase()
      .includes(query.toLowerCase()))
    : todos;
};
