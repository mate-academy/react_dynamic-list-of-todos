import { Todo } from '../types/Todo';
import { ForFilteredTodos } from './TodoFilter';

export const forFilteredTodos = (
  todos: Todo[],
  query: string,
  selectedFilter: ForFilteredTodos,
) => {
  let preparedTodo = todos;

  if (query) {
    preparedTodo = todos.filter(({ title }) => {
      return title.toLowerCase().includes(query.toLowerCase());
    });
  }

  if (selectedFilter) {
    switch (selectedFilter) {
      case ForFilteredTodos.noCompleted:
        return preparedTodo.filter(({ completed }) => !completed);
      case ForFilteredTodos.completed:
        return preparedTodo.filter(({ completed }) => completed);
      default:
        return preparedTodo;
    }
  }

  return preparedTodo;
};
