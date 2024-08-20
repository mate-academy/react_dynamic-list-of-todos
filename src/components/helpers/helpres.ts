import { Todo } from '../../types/Todo';

const getFilteredListBySelectValue = (todo: Todo, condition: string) => {
  switch (condition) {
    case 'completed':
      return todo.completed;
    case 'active':
      return !todo.completed;
    default:
      return true;
  }
};

const getFilteredListByInputValue = (title: string, query: string) => {
  return title.toLowerCase().includes(query.toLowerCase().trim());
};

export const getFilteredList = (
  todosList: Todo[],
  condition: string,
  query: string,
): Todo[] => {
  if (condition || query) {
    return todosList.filter((todo: Todo) => {
      const matchesCondition =
        !condition || getFilteredListBySelectValue(todo, condition);
      const matchesQuery =
        !query || getFilteredListByInputValue(todo.title, query);

      return matchesCondition && matchesQuery;
    });
  }

  return todosList;
};
