import { SelectTodos } from '../types/Select';
import { Todo } from '../types/Todo';

export const filterTodos = (
  todosArr: Todo[],
  querySelect: string,
  queryInput: string,
) => {
  let filterT = todosArr;

  switch (querySelect) {
    case SelectTodos.All:
      filterT = todosArr;
      break;

    case SelectTodos.Active:
      filterT = filterT.filter(todo => todo.completed === false);
      break;

    case SelectTodos.Completed:
      filterT = filterT.filter(todo => todo.completed === true);
      break;
  }

  if (queryInput === '') {
    return filterT;
  }

  filterT = filterT.filter(todo =>
    todo.title.toLowerCase().includes(queryInput),
  );

  return filterT;
};
