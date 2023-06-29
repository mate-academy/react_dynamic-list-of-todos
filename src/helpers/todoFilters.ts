import { Todo } from '../types/Todo';
import { TodoStatus } from '../types/TodoStatus';

export const filterTodoByTitle = (searchQuery: string) => {
  const preparedSearchQuery = searchQuery.toLowerCase();

  return (todo: Todo) => (
    todo.title.toLowerCase().includes(preparedSearchQuery)
  );
};

export const filterTodoByStatus = (status: TodoStatus) => {
  return (todo: Todo) => {
    switch (status) {
      case TodoStatus.Active:
        return !todo.completed;
      case TodoStatus.Completed:
        return todo.completed;
      default:
        return true;
    }
  };
};
