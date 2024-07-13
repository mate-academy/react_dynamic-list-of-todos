import { Todo } from '../types/Todo';

export const filterTodos = (
  todosArr: Todo[],
  querySelect: string,
  queryInput: string,
) => {
  let filterT = todosArr;

  switch (querySelect) {
    case 'all':
      filterT = todosArr;
      break;

    case 'active':
      filterT = filterT.filter(todo => todo.completed === false);
      break;

    case 'completed':
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
