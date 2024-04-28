import { Todo } from '../types/Todo';

type SearchParams = {
  sortStatus: string;
  querry: string;
};

export const sortTodos = (
  todos: Todo[],
  { sortStatus, querry }: SearchParams,
) => {
  let copy = [...todos];

  switch (sortStatus) {
    case 'active': {
      copy = copy.filter(todo => !todo.completed);
      break;
    }

    case 'completed': {
      copy = copy.filter(todo => todo.completed);
      break;
    }

    default:
      break;
  }

  if (querry) {
    const normilizeQuerry = querry.toLowerCase().trim();

    copy = copy.filter(todo =>
      todo.title.toLowerCase().includes(normilizeQuerry),
    );
  }

  return copy;
};
