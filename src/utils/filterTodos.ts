import { Filters } from '../types/Filters';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: Filters) => {
  const filteredTodos = todos.filter(todo => todo.title.toLowerCase()
    .includes(filter.title.toLowerCase()));

  switch (filter.status) {
    case 'completed':
      return filteredTodos.filter(todo => todo.completed);
    case 'active':
      return filteredTodos.filter(todo => !todo.completed);
    default:
      return filteredTodos;
  }
};
