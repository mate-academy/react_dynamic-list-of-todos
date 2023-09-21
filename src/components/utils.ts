import { Todo } from '../types/Todo';

export type Filter = 'completed' | 'all' | 'active';

export const filterTodos = (todos: Todo[], filterBy: Filter, query: string) => {
  const filteredTodos = todos.filter(todo => todo.title.toLowerCase()
    .includes(query.toLowerCase()));

  switch (filterBy) {
    case 'completed':
      return filteredTodos.filter(v => v.completed === true);
    case 'all':
      return filteredTodos;
    case 'active':
      return filteredTodos.filter(v => v.completed === false);
    default:
      return filteredTodos;
  }
};
