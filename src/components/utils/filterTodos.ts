import { SelectCategory } from '../../types/SelectCategory';
import { Todo } from '../../types/Todo';

export const filterTodos = (
  todos: Todo[],
  filters: { selectCategory: SelectCategory; query: string },
): Todo[] => {
  const { selectCategory, query } = filters;

  return todos
    .filter(todo => {
      if (selectCategory === SelectCategory.completed) {
        return todo.completed;
      }

      if (selectCategory === SelectCategory.active) {
        return !todo.completed;
      }

      return true;
    })
    .filter(todo => {
      const lowerQuery = query.toLowerCase();

      return todo.title.toLowerCase().includes(lowerQuery);
    });
};
