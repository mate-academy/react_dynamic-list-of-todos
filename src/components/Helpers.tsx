import { Todo } from '../types/Todo';

export const filterTodos
= (initialTodos: Todo[], filter:string, query: string) => {
  const filteredTodos = initialTodos.filter((todo: Todo) => {
    const normalizedQuery = query.trim().toLowerCase();
    const isIncludes = todo.title.toLowerCase().includes(normalizedQuery);

    switch (filter) {
      case 'active':
        return !todo.completed && isIncludes;

      case 'completed':
        return todo.completed && isIncludes;

      default:
        return isIncludes;
    }
  });

  return filteredTodos;
};
