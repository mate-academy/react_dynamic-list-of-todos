import { Todo } from '../types/Todo';
import { SortFields } from '../types/enum';

export function getFilterTodos(
  todos: Todo[],
  filterField: string,
  searchValue: string,
) {
  const filterTodos = todos.filter(todo => {
    const hasIncludesSearchValue = todo.title
      .toLocaleLowerCase()
      .includes(searchValue.toLocaleLowerCase());

    switch (filterField) {
      case SortFields.Active:
        return !todo.completed && hasIncludesSearchValue;
      case SortFields.Comleted:
        return todo.completed && hasIncludesSearchValue;
      default:
        return hasIncludesSearchValue;
    }
  });

  return filterTodos;
}
