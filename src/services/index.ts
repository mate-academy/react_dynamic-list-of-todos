import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

export function filterData(todos: Todo[], query: string, status: Status) {
  const filteredData = todos.filter((todo) => {
    switch (status) {
      case Status.Active:
        return !todo.completed;
      case Status.Completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  let data: Todo[] = [...filteredData];

  if (query) {
    const preparedQuery = query.toLowerCase().trim();

    data = filteredData
      .filter(todo => todo.title.toLowerCase().includes(preparedQuery));
  }

  return data;
}
