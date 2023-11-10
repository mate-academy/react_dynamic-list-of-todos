import { Sort } from '../types/Sort';
import { Todo } from '../types/Todo';

export function filterTodos(todos: Todo[], sortType: Sort, query: string) {
  let newTodo = [...todos];

  if (query.trim()) {
    newTodo = newTodo.filter(todo => todo.title
      .toLowerCase()
      .includes(query.toLowerCase()));
  }

  switch (sortType) {
    case Sort.Active:
      return newTodo.filter(todo => !todo.completed);
    case Sort.Completed:
      return newTodo.filter(todo => todo.completed);
    default:
      return newTodo;
  }
}
