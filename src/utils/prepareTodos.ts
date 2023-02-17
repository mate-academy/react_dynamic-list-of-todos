import { Todo } from '../types/Todo';

export const prepareTodos = (
  todos: Todo[],
  query: string,
  sortType: string,
):Todo[] => {
  let todosForRender = [...todos];

  if (query) {
    const lowQuery = query.toLowerCase();

    todosForRender = todosForRender.filter(
      todo => todo.title.toLowerCase().includes(lowQuery),
    );
  }

  if (sortType !== 'all') {
    todosForRender = todosForRender.filter(todo => {
      switch (sortType) {
        case 'active':
          return !todo.completed;
        case 'completed':
          return todo.completed;
        default:
          return todo;
      }
    });
  }

  return todosForRender;
};
