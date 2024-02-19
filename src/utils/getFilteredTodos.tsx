import { Todo } from "../types/Todo";
import { Status } from "../types/Status";

export const getFilteredTodos = (
  todos: Todo[],
  filter: Status,
  query: string,
) => {
  return todos
    .filter((todo) => {
      return todo.title.toLowerCase().includes(query.trim().toLowerCase());
    })
    .filter(({ completed }) => {
      switch (filter) {
        case Status.active:
          return !completed;
        case Status.completed:
          return completed;
        default:
          return true;
      }
    });
};
