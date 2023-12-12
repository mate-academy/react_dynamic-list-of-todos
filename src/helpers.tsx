import { Todo } from './types/Todo';
import { User } from './types/User';

type FilterType = string;

enum FilteredBy {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export function filteredTodoList(
  todos: Todo[],
  filterBy: FilterType,
  query: string,
) {
  if (query) {
    // eslint-disable-next-line no-param-reassign
    todos = todos.filter(
      todo => todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  switch (filterBy) {
    case FilteredBy.Active:
      return todos.filter(todo => !todo.completed);
    case FilteredBy.Completed:
      return todos.filter(todo => todo.completed);
    case FilteredBy.All:
    default:
      return todos;
  }
}

export function getUserTodos(todos: Todo[], users: User[]): Todo[] {
  const userTodos = todos.map(todo => {
    const user = users.find(u => u.id === todo.userId);

    if (user) {
      return {
        ...todo,
        user,
      };
    }

    return todo;
  });

  return userTodos;
}
