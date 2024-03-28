import { Todo } from '../../types/Todo';

export const getPreparedTodos = (
  todos: Todo[],
  query: string,
  filterOption: string,
) => {
  let todosCopy = [...todos];

  if (query) {
    todosCopy = todosCopy.filter(todo =>
      todo.title.trim().toLowerCase().includes(query.trim().toLowerCase()),
    );
  }

  return todosCopy.filter(todo => {
    switch (filterOption) {
      case 'completed':
        return todo.completed;

      case 'active':
        return !todo.completed;

      case 'all':
      default:
        return true;
    }
  });
};
