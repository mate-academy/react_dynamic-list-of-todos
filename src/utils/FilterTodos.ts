import { Todo } from '../types/Todo';
import { TodoStatus } from './FilterParams';

export function filterTodos(status: TodoStatus, todosList: Todo[]) {
  switch (status) {
    case TodoStatus.Active:
      return todosList.filter(todo => !todo.completed);
    case TodoStatus.Completed:
      return todosList.filter(todo => todo.completed);
    default:
      return todosList;
  }
}
