import { Todo } from '../types/Todo';

export const getFilteredTodos = (
  todos: Todo[],
  query: string,
  filterOption: string,
) => {
  return todos.filter((todo : Todo) => {
    let filter;

    const title = todo.title
      .replace(/ /g, '')
      .toLowerCase();
    const searchingWord = query
      .replace(/ /g, '')
      .toLowerCase();

    const isTitleIncludeQuery = title.includes(searchingWord);

    switch (filterOption) {
      case 'active':
        filter = todo.completed === false;
        break;

      case 'completed':
        filter = todo.completed === true;
        break;

      default:
        filter = true;
        break;
    }

    return filter && isTitleIncludeQuery;
  });
};
