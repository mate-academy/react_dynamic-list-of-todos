import { Todo } from '../types/Todo';

export function handleTodoFilter(
  todoFromServer: Todo[],
  filterBy: string,
  title = '',
): Todo[] {
  const filteredTodo = todoFromServer
    .filter(todo => todo.title.toLowerCase().includes(title.toLowerCase()));

  switch (filterBy) {
    case 'active':
      return filteredTodo.filter(todo => !todo.completed);

    case 'completed':
      return filteredTodo.filter(todo => todo.completed);

    default:
      return filteredTodo;
  }
}
