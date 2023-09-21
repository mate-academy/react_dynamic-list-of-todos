import { Todo } from '../../types/Todo';

type Args = {
  todos: Todo[],
  filter: string,
  searchText: string,
};

export function filterTodos({ filter, searchText, todos }: Args) {
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return todo.title.includes(searchText);
      case 'completed':
        return todo.completed && todo.title.includes(searchText);
      case 'active':
        return !todo.completed && todo.title.includes(searchText);
      default:
        return true;
    }
  });

  return filteredTodos;
}
