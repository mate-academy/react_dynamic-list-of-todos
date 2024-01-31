import { Todo } from './types/Todo';
import { FilterType } from './types/helperType';

export const FilterReducer = (todos: Todo[], sortType: FilterType): Todo[] => {
  switch (sortType) {
    case FilterType.ACTIVE:
      return todos.filter(todo => !todo.completed);
    case FilterType.COMPLETED:
      return todos.filter(todo => todo.completed);
    case FilterType.ALL:
      return todos;
    default:
      throw Error('Reducer Error');
  }
};

export const filterTodosByTitle = (todos: Todo[], query: string) => (
  todos.filter(todo => todo.title.includes(query))
);

export function debonce<T>(func: (value: T) => void, deley: number) {
  let timerId: NodeJS.Timeout;

  return (...args: [T]) => {
    clearTimeout(timerId);
    timerId = setTimeout(func, deley, ...args);
  };
}
