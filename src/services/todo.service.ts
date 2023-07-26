import { Todo } from '../types/Todo';

export enum TodoListStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export interface IOptionsTodos {
  query: string,
  todoListStatus: TodoListStatus
}
export const getFilteredTodos = (
  totalTodos: Todo[],
  options: IOptionsTodos,
) => {
  let filteredTodos = Array.from(totalTodos);

  if (options.query) {
    const normalizedQuery = options.query.toLowerCase();

    filteredTodos = filteredTodos.filter(todo => {
      return todo.title.toLowerCase().includes(normalizedQuery);
    });
  }

  if (options.todoListStatus) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (options.todoListStatus) {
        case TodoListStatus.Active:
          return !todo.completed;
        case TodoListStatus.Completed:
          return todo.completed;
        default:
          return todo;
      }
    });
  }

  return filteredTodos;
};
