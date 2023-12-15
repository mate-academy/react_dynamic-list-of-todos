import { Todo } from './types/Todo';
import { TypeOfFilter } from './types/typeOfFilter';

export const filterTodos = (
  todos: Todo[],
  typeFilter: TypeOfFilter,
  querry: string,
) => {
  let copy = [...todos];

  if (querry) {
    copy = copy.filter(({ title }) => (
      title.toLowerCase().includes(querry.toLowerCase())));
  }

  if (typeFilter === TypeOfFilter.Active) {
    copy = copy.filter(todo => !todo.completed);
  }

  if (typeFilter === TypeOfFilter.Complited) {
    copy = copy.filter(todo => todo.completed);
  }

  return copy;
};
