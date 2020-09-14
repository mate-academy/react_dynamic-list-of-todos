export const getVisibleTodos = (todos, sortType) => {
  switch (sortType) {
    case 'completed':
      return todos.filter(todo => todo.completed === true);

    case 'active':
      return todos.filter(todo => todo.completed === false);

    default:
      return todos.filter(todo => todo.title && todo.userId);
  }
};
