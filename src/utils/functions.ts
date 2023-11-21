import { TodoStatus } from '../types/TodoStatus';
import { Todo } from '../types/Todo';

export function filterTodoList(
  todoList: Todo[],
  query: string,
  filter: string,
) {
  return todoList
    .filter(todo => todo.title.toLowerCase()
      .includes(query.toLowerCase()))
    .filter(todo => {
      switch (filter) {
        case TodoStatus.Active:
          return !todo.completed;

        case TodoStatus.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
}
