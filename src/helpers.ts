import { Todo } from './types/Todo';
import { TodoStatus } from './types/TodoStatus';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  status: TodoStatus,
): Todo[] => {
  // const filteredTodos = [...todos];

  // if (query.trim()) {
  //   const loweredQuery = query.toLowerCase();

  //   filteredTodos = filteredTodos.filter(todo => (
  //     todo.title.toLowerCase().includes(loweredQuery)));
  // }

  // switch (status) {
  //   case TodoStatus.Active:
  //     return filteredTodos.filter()
  //   default:
  //     break;
  // }
  const loweredQuery = query.trim().toLowerCase();
  let todoFilterStatus = true;

  return todos.filter(todo => {
    const loweredTodoTitle = todo.title.toLowerCase();

    switch (status) {
      case TodoStatus.Active:
        todoFilterStatus = !todo.completed;
        break;

      case TodoStatus.Completed:
        todoFilterStatus = todo.completed;
        break;

      default:
        todoFilterStatus = true;
        break;
    }

    return loweredTodoTitle.includes(loweredQuery) && todoFilterStatus;
  });
};
