import { Todo } from '../types/Todo';

interface Options {
  COMPLETED: string;
  ACTIVE: string;
}

const OPTIONS_TODOS: Options = {
  COMPLETED: 'completed',
  ACTIVE: 'active',
};

export function getOptionTodos(option: string, todos: Todo[]) {
  switch (option) {
    case OPTIONS_TODOS.COMPLETED:
      return todos.filter(todo => todo.completed);

    case OPTIONS_TODOS.ACTIVE:
      return todos.filter(todo => !todo.completed);

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
