export const getFilteredTodos = (
  todosFromServer: Todo[],
  searchTitle: string,
  filterParameter: string,
) => {
  const todosCopy = [...todosFromServer];
  let filtered: Todo[];

  switch (filterParameter) {
    case 'Active':
      filtered = todosCopy.filter(todo => todo.completed !== true);
      break;

    case 'Completed':
      filtered = todosCopy.filter(todo => todo.completed === true);
      break;

    default:
      filtered = todosCopy;
      break;
  }

  filtered = filtered.filter(todo => todo.title.includes(searchTitle));

  return filtered;
};
