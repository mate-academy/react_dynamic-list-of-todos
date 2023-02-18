import { Todo } from '../types/Todo';

export function prepareTodo(
  qwery: string,
  todos: Todo[],
  field: string,
) {
  let isVisibleTodo = [...todos];

  if (qwery) {
    isVisibleTodo = isVisibleTodo.filter(todo => {
      return todo
        .title
        .toLocaleLowerCase()
        .includes(qwery);
    });
  }

  switch (field) {
    case ('active'):
      isVisibleTodo = isVisibleTodo.filter(todo => !todo.completed);
      break;

    case ('completed'):
      isVisibleTodo = isVisibleTodo.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  return isVisibleTodo;
}
