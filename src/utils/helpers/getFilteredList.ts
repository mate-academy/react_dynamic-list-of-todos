import { Todo } from '../../types/Todo';
import { Filter } from '../../types/Filter';

export const getFilteredList = (
  todos: Todo[],
  filterName: Filter,
  appliedQuery: string,
) => {
  let filteredTodos = todos;

  switch (filterName) {
    case Filter.active:
      filteredTodos = filteredTodos.filter(({ completed }) => !completed);
      break;
    case Filter.completed:
      filteredTodos = filteredTodos.filter(({ completed }) => completed);
      break;
  }
  // if (filterName === Filter.active || filterName === Filter.completed) {
  //   filteredTodos = todos.filter(({ completed }) => {
  //     if (filterName === 'active') {
  //       return !completed;
  //     } else {
  //       return completed;
  //     }
  //   });
  // }

  if (appliedQuery) {
    filteredTodos = filteredTodos.filter(({ title }) =>
      title.toLowerCase().includes(appliedQuery.toLowerCase()),
    );
  }

  return filteredTodos;
};
