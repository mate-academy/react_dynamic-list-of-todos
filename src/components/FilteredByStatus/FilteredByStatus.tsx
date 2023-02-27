import { Status, Todo } from '../../types/Todo';

export const filteredByStatus = (
  todos: Todo[],
  query: string,
  status: Status,
) => {
  let filteredTodos = [...todos];

  if (status !== Status.ALL) {
    filteredTodos = filteredTodos.filter(todo => {
      switch (status) {
        case Status.ACTIVE:
          return !todo.completed;
        case Status.COMPLETED:
          return todo.completed;
        default:
          throw new Error('Status is incorrect');
      }
    });
  }

  if (query) {
    const lowerCaseQuery = query.toLowerCase();

    filteredTodos = filteredTodos.filter(todo => (
      todo.title.toLowerCase().includes(lowerCaseQuery)
    ));
  }

  return filteredTodos;
};
