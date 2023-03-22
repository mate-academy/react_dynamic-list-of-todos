export const filterTodos = (todos, filterByStatus, query) => {
  const isQuery = query.length > 0;

  const filterByTitle = allTodos => allTodos
    .filter(({ title }) => title.includes(query));

  const filterByStatusComplted = allTodos => allTodos
    .filter(({ completed }) => completed);

  const filterByStatusActive = allTodos => allTodos
    .filter(({ completed }) => !completed);

  const filteredByTitle = filterByTitle(todos);

  if (filterByStatus === 'completed') {
    return filterByStatusComplted(filteredByTitle);
  }

  if (filterByStatus === 'active') {
    return filterByStatusActive(filteredByTitle);
  }

  return isQuery ? filteredByTitle : todos;
};

export const debounce = (f, delay) => {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    timerId = setTimeout(f, delay, ...args);
  };
};
