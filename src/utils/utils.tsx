import { Todo } from '../types/Todo';

export enum FilterEnum {
  ALL = 'all',
  COMPLETE = 'completed',
  ACTIVE = 'active',

}

export function getFilterTodos(todos:Todo[], filter:string):Todo[] {
  const preparedTodos = [...todos];

  if (filter === FilterEnum.ALL) {
    return preparedTodos;
  }

  if (filter === FilterEnum.COMPLETE) {
    return preparedTodos.filter(todo => todo.completed);
  }

  if (filter === FilterEnum.ACTIVE) {
    return preparedTodos.filter(todo => !todo.completed);
  }

  return preparedTodos;
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
