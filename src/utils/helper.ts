import { SelectFilter } from '../types/SelectFilter';
import { Todo } from '../types/Todo';

const transform = (title: string) => title.toLowerCase();

export const getFiltredToDos = (
  todos: Todo[], selectFilter: SelectFilter, query: string,
) => {
  const filtredToDos = todos.filter(todo => {
    const { title } = todo;
    const isInclude = transform(title).includes(transform(query));

    switch (selectFilter) {
      case SelectFilter.ACTIVE:
        return !todo.completed && isInclude;

      case SelectFilter.COMPLETED:
        return todo.completed && isInclude;

      case SelectFilter.ALL:
      default:
        return isInclude;
    }
  });

  return filtredToDos;
};

export function handleTodoStatusChange(
  setSelectFilter: (selectFilter: SelectFilter) => void,
) {
  return (event: React.ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case SelectFilter.ACTIVE:
        setSelectFilter(SelectFilter.ACTIVE);
        break;
      case SelectFilter.COMPLETED:
        setSelectFilter(SelectFilter.COMPLETED);
        break;
      case SelectFilter.ALL:
      default:
        setSelectFilter(SelectFilter.ALL);
    }
  };
}
