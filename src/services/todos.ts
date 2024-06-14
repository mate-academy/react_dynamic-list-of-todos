import { Todo } from '../types/Todo';

export enum TodoFilterOptions {
  COMPLETED = 'completed',
  ACTIVE = 'active',
  ALL = 'all',
}

export function getOptionTodos(option: TodoFilterOptions, todos: Todo[]) {
  switch (option) {
    case TodoFilterOptions.COMPLETED:
      return todos.filter(todo => todo.completed);

    case TodoFilterOptions.ACTIVE:
      return todos.filter(todo => !todo.completed);

    case TodoFilterOptions.ALL:
    default:
      return todos;
  }
}

export function debounce(
  callback: React.Dispatch<React.SetStateAction<string>>,
  delay: number,
): (arg: string) => void {
  let timerId: number;

  return (arg: string) => {
    window.clearTimeout(timerId);

    timerId = window.setTimeout(() => callback(arg), delay);
  };
}
