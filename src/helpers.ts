import { Todo } from './types/Todo';

export const filterTodos = (
  todos: Todo[],
  filter: string,
  query: string,
) => {
  return todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.completed;
      case 'active':
        return !todo.completed;
      default:
        return todo;
    }
  })
    .filter(todo => (
      todo.title.toLowerCase().includes(query.toLowerCase().trim())
    ));
};
