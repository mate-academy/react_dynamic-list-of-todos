import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export const FilterTodo = (todos: Todo[], text: string, status: Status) => {
  let filteByText = todos;
  let filteredTodos = filteByText;

  if (text) {
    filteByText = todos.filter(
      (todo: Todo) => todo.title.toLowerCase().includes(text.toLowerCase()),
    );
  }

  switch (status) {
    case Status.All:
      filteredTodos = filteByText;
      break;

    case Status.Active:
      filteredTodos = filteByText.filter((todo: Todo) => !todo.completed);
      break;

    default:
      filteredTodos = filteByText.filter((todo: Todo) => todo.completed);
  }

  return filteredTodos;
};
