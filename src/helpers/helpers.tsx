import { Todo } from '../types/Todo';

export const filterTodos = (
  todos: Todo[],
  filterType: string,
  searchQuery: string,
) => {
  return todos.filter(todo => {
    const filteredTodo = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    switch (filterType) {
      case 'active':
        return !todo.completed && filteredTodo;

      case 'completed':
        return todo.completed && filteredTodo;

      default:
        return todo && filteredTodo;
    }
  });
};
