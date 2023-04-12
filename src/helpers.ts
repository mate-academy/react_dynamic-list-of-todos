import { Todo } from './types/Todo';
import { TodoCompletionFilter } from './types/TodoCompletionFilter';

export const filterTodos = (
  todos: Todo[],
  todoCompletionFilterOption: TodoCompletionFilter,
  searchQuery: string,
): Todo[] => (
  todos
    .filter(todo => {
      switch (todoCompletionFilterOption) {
        case TodoCompletionFilter.Completed:
          return todo.completed;
        case TodoCompletionFilter.Active:
          return !todo.completed;
        default:
          return true;
      }
    })
    .filter(todo => (
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    ))
);
