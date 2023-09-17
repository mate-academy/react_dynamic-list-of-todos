import { Filter } from '../types/Filter';
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
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
}
