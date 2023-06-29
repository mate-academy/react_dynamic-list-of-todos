import { Todo } from './types/Todo';

export const filterTodoByCompleted = (
  todos: Todo[], completed: boolean,
): Todo[] => (
  todos.filter(todo => todo.completed === completed)
);
