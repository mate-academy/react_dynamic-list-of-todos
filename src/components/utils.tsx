import { Todo } from '../types/Todo';
import { Options } from '../types/Options';

export const filteredTodos = (
  todosFromServer: Todo[], option: Options, query: string,
) => {
  let selectedTodos:Todo[] = [...todosFromServer];

  const filteredTodosArray: Todo[] = selectedTodos.filter((todo: Todo) => {
    return todo.title.toLowerCase().includes(query.toLowerCase());
  });

  switch (option) {
    case Options.ACTIVE.toLowerCase():
      selectedTodos = filteredTodosArray.filter(todo => !todo.completed);
      break;
    case Options.COMPLETED.toLowerCase():
      selectedTodos = filteredTodosArray.filter(todo => todo.completed);
      break;
    case Options.ALL.toLowerCase():
      selectedTodos = filteredTodosArray;
      break;
    default:
      selectedTodos = filteredTodosArray;
  }

  return selectedTodos;
};
