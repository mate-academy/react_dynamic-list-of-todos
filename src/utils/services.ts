/* eslint-disable @typescript-eslint/indent */
import { Filter } from '../types/Filter';
import { Todo } from '../types/Todo';

export function getListToShow(
  list: Todo[],
  filter: Filter,
  searchInput: string,
) {
  const listToShow = searchInput.length
    ? list.filter(todo =>
        todo.title.toLowerCase().includes(searchInput.toLowerCase()),
      )
    : [...list];

  switch (filter) {
    case 'active':
      return listToShow.filter(todo => !todo.completed);
    case 'completed':
      return listToShow.filter(todo => todo.completed);
    default:
      return listToShow;
  }
}
