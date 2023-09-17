import { Todo } from '../types/Todo';

export function getPreparedTodos(
  todos: Todo[],
  query: string,
  selected: string,
) {
  let filteredTodos = todos;
  const filterTodosByQuery = (title: string) => {
    return title.toLowerCase().includes(query.toLowerCase());
  };

  if (query) {
    filteredTodos = filteredTodos
      .filter(({ title }) => filterTodosByQuery(title));
  }

  if (selected) {
    switch (selected) {
      case 'active':
        filteredTodos = filteredTodos.filter(({ completed }) => !completed);
        break;

      case 'completed':
        filteredTodos = filteredTodos.filter(({ completed }) => completed);
        break;

      default:
        filteredTodos = filteredTodos
          .filter(({ title }) => filterTodosByQuery(title));
    }
  }

  return filteredTodos;
}
