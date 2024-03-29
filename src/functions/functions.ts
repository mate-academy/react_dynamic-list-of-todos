import { Status } from '../enums/Status';
import { Todo } from '../types/Todo';

export const handleFiltration = (
  query: string,
  condition: Status,
  initialValues: Todo[],
) => {
  let preparedTodos = [...initialValues];

  if (query) {
    preparedTodos = preparedTodos.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  if (condition) {
    switch (condition) {
      case Status.Active.toLowerCase():
        preparedTodos = preparedTodos.filter(todo => !todo.completed);
        break;
      case Status.Completed.toLowerCase():
        preparedTodos = preparedTodos.filter(todo => todo.completed);
        break;
    }
  }

  return preparedTodos;
};
