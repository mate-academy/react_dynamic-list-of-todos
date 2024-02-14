import { Todo } from '../types/Todo';

export const filterTodosBySearchQuery
= (todos: Todo[], searchQuery: string) => {
  return todos.filter(
    todo => todo.title.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );
};

export const filterActiveOrCompletedTodosBySearchQuery
= (todos: Todo[], searchQuery: string, completed: boolean) => {
  return todos.filter(
    todo => todo.completed === completed && todo.title.toLowerCase()
      .includes(searchQuery.trim().toLowerCase()),
  );
};
