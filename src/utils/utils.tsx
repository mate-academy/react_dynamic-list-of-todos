import { FilterEnum } from '../enums/EnumFilter';
import { Todo } from '../types/Todo';

export function getFilterTodos(todos:Todo[], filter:string):Todo[] {
  if (filter === FilterEnum.ALL) {
    return todos;
  }

  if (filter === FilterEnum.COMPLETE) {
    return todos.filter(todo => todo.completed);
  }

  if (filter === FilterEnum.ACTIVE) {
    return todos.filter(todo => !todo.completed);
  }

  return todos;
}

export function inputFilterTodos(todos:Todo[], query:string) {
  const normalizedQuery = query.trim().toLowerCase();
  let copyTodos = [...todos];

  if (normalizedQuery) {
    copyTodos = copyTodos.filter(
      todo => todo.title.toLowerCase().includes(normalizedQuery),
    );
  }

  return copyTodos;
}
