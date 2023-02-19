import { Status } from '../types/Status';
import { Todo } from '../types/Todo';

export const getVisibleTodos = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  let visibleTodos = [...todos];

  if (status !== Status.All) {
    visibleTodos = visibleTodos.filter(todo => {
      switch (status) {
        case Status.Active:
          return todo.completed !== true;
        case Status.Completed:
          return todo.completed === true;
        default:
          throw new Error('Status is incorrect');
      }
    });
  }

  if (query) {
    const lowerCaseQuery = query.toLowerCase();

    visibleTodos = visibleTodos.filter(todo => (
      todo.title.toLowerCase().includes(lowerCaseQuery)
    ));
  }

  return visibleTodos;
};
