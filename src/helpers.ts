import { TodoStatusOptions } from './enums/TodoStatusOptions';
import { Todo } from './types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  searchQuery: string,
  selectedOption: string,
) => {
  const search = searchQuery.toLowerCase().trim();

  return todos.filter(todo => {
    const title = todo.title.toLowerCase();
    const foundTodo = title.includes(search);

    switch (selectedOption) {
      case TodoStatusOptions.all:
        return foundTodo;

      case TodoStatusOptions.active:
        return !todo.completed && foundTodo;

      case TodoStatusOptions.completed:
        return todo.completed && foundTodo;

      default:
        return foundTodo;
    }
  });
};
