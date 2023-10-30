import { Todo } from '../Todo';

export const todoFilter = (param: string, query: string, todos: Todo[]) => {
  let todosCopy = [...todos];

  switch (param) {
    case 'active':
      todosCopy = todosCopy.filter(todo => !todo.completed);
      break;

    case 'completed':
      todosCopy = todosCopy.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  if (query) {
    todosCopy = todosCopy
      .filter(todo => todo.title.toLocaleLowerCase()
        .includes(query.toLocaleLowerCase()));
  }

  return todosCopy;
};
