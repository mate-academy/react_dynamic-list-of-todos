import { Todo } from '../Todo';

export const filterTodosByStatus = (todos: Todo[], todoStatus: boolean) => (
  todos.filter(todo => todo.completed === todoStatus)
);
