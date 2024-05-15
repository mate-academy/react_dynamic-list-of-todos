import { Todo } from '../types/Todo';

type FilterParams = {
  query?: string;
  selectedField?: string;
};

export function getFilteredTodos(
  items: Todo[],
  { query, selectedField }: FilterParams,
) {
  let visibleItems = [...items];

  if (query) {
    const normalizedQuery = query.toLowerCase();

    visibleItems = visibleItems.filter(item =>
      item.title.toLowerCase().includes(normalizedQuery),
    );
  }

  if (selectedField) {
    switch (selectedField) {
      case 'active':
        visibleItems = visibleItems.filter(item => !item.completed);
        break;

      case 'completed':
        visibleItems = visibleItems.filter(item => item.completed);
        break;
      default:
        break;
    }
  }

  return visibleItems;
}
