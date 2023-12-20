import { FilterOption } from '../enums/FilterOption';
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

const filterByCompleted = (todos: Todo[], option: FilterOption) => {
  switch (option) {
    case FilterOption.ACTIVE:
      return todos.filter((todo) => !todo.completed);
    case FilterOption.COMPLETED:
      return todos.filter((todo) => todo.completed);
    default: return todos;
  }
};

const filterBySearch = (todos: Todo[], search: string) => {
  if (!search) {
    return todos;
  }

  return todos.filter((todo) => todo.title
    .toLowerCase().includes(search.toLowerCase()));
};

export const todosFilter = (todos: Todo[], filter: Filter): Todo[] => {
  const { filterOption, filterText } = filter;
  const filteredTodos = filterBySearch(todos, filterText);

  return filterByCompleted(filteredTodos, filterOption);
};
