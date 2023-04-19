import { Todos } from '../enums/Todos';
import { Todo } from '../types/Todo';

export const filterTodos = (todos: Todo[], filter: Todos, query: string) => {
  return todos.filter((todo) => {
    const fixedTitle = todo.title.toLocaleLowerCase();
    const fixedQuery = query.toLocaleLowerCase();

    const isActive = filter === Todos.Active && !todo.completed;
    const isCompleted = filter === Todos.Completed && todo.completed;
    const filterByStatus = filter === Todos.All || isActive || isCompleted;

    if (query === '') {
      return filterByStatus;
    }

    return filterByStatus && fixedTitle.includes(fixedQuery);
  });
};
