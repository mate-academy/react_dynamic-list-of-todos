import { Todo } from './types/Todo';

export enum SelectStatus {
  Completed = 'completed',
  All = 'all',
  Active = 'active',
}

type Filtred = {
  query: string;
  todoStatus: SelectStatus;
};

export const getFiltred = (
  todos: Todo[],
  options: Filtred,
) => {
  const { todoStatus, query } = options;
  let filtredTodos = [...todos];

  if (todoStatus !== SelectStatus.All) {
    filtredTodos = filtredTodos.filter(todo => {
      switch (todoStatus) {
        case SelectStatus.Completed:
          return todo.completed;

        case SelectStatus.Active:
          return !todo.completed;

        default:
          return true;
      }
    });
  }

  if (query) {
    filtredTodos = filtredTodos.filter(todo => {
      return todo.title
        .toLowerCase()
        .includes(query.toLowerCase());
    });
  }

  return filtredTodos;
};
