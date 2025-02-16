import { Todo } from '../../types/Todo';
import { FilterConditions } from '../../enums/FilterOptions';

const getFilteredListBySelectValue = (
  todo: Todo,
  condition: FilterConditions,
) => {
  switch (condition) {
    case FilterConditions.Completed:
      return todo.completed;
    case FilterConditions.Active:
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
  condition: FilterConditions,
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
