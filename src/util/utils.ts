import { ActiveSelector, Todo } from '../types/Types';

export function filteredTodos(todos: Todo[], selector: string, query = '') {
  let list = [...todos];

  switch (selector) {
    case ActiveSelector.Active:
      list = todos.filter(todo => !todo.completed);
      break;
    case ActiveSelector.Completed:
      list = todos.filter(todo => todo.completed);
      break;
  }

  if (query) {
    return list.filter(todo => {
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
    });
  }

  return list;
}
