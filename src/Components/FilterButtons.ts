import { Todo } from '../helpers/api';

export const getVisibleTodos = (todos: Todo[], sortType: string) => {
  switch (sortType) {
    case 'title':
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));

    case 'id':
      return [...todos].sort((a, b) => a.id - b.id);

    case 'userName':
      return [...todos].sort((a, b) => {
        return (a.user && b.user)
          ? a.user.name.localeCompare(b.user.name)
          : 0;
      });

    case 'status':
      return [...todos].sort((a, b) => {
        return +a.completed - +b.completed;
      });

    default:
      return todos;
  }
};
