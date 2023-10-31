import { Filter } from '../types/Filter';
import { Todos } from '../types/Todos';

export const prepareTodos = (filter: Filter, todos: Todos) => {
  const { type, query } = filter;
  let filteredTodos = [...todos.todos];

  if (type) {
    switch (type) {
      case 'active':
        filteredTodos = filteredTodos.filter(todo => !todo.completed);
        break;
      case 'completed':
        filteredTodos = filteredTodos.filter(todo => todo.completed);
        break;
      default:
        break;
    }
  }

  if (query) {
    filteredTodos = filteredTodos.filter(todo => {
      const normaliedQuery = query.toLowerCase().trim();

      return todo.title.toLowerCase().includes(normaliedQuery);
    });
  }

  return filteredTodos;
};
