import { Todo } from '../types/Todo';

export function searchQueryInField(
  selectedBy: string,
  query: string,
  list: Todo[],
): Todo[] {
  let listCopy = [...list];

  if (selectedBy) {
    listCopy = listCopy?.filter(item => {
      switch (selectedBy) {
        case 'all':
          return item;
        case 'active':
          return !item.completed;
        case 'completed':
          return item.completed;
        default:
          return item;
      }
    });
  }

  if (query) {
    listCopy = listCopy.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  return listCopy;
}
