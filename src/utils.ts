import { Todo, Status } from './types';

type GetTodos = (
  todos: Todo[],
  { query, status }: { query: string, status: Status }
) => Todo[];

export const getVisibleTodos: GetTodos = (todos, { query, status }) => {
  let allTodos = [...todos];

  if (query) {
    const normalizedQuery = query.trim().toLowerCase();

    allTodos = allTodos.filter(
      todo => todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return allTodos.filter(todo => {
    switch (status) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });
};
