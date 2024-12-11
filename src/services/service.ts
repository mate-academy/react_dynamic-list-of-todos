import { FilterRules } from '../types/FilterField';
import { Todo } from '../types/Todo';

export const filterTodosByRule = (todos: Todo[], rule: FilterRules): Todo[] => {
  switch (rule) {
    case FilterRules.ALL:
      return todos;
    case FilterRules.ACTIVE:
      return todos.filter((todo: Todo) => !todo.completed);
    case FilterRules.COMPLETED:
      return todos.filter((todo: Todo) => todo.completed);
    default:
      return todos;
  }
};

export const findTodosByQuery = (todos: Todo[], query: string) => {
  return todos.filter((todo: Todo) =>
    todo.title.toLowerCase().includes(query?.toLowerCase()),
  );
};
